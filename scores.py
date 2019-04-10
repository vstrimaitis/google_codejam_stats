import argparse
import base64
import json
import os
import re

import requests

from convert import json_to_camel_case

URL = lambda contest_id, query: f"https://codejam.googleapis.com/scoreboard/{contest_id}/poll?p={query}"
OUTPUT_ROOT = "./client/public/round_data"
SCORES_ROOT = os.path.join(OUTPUT_ROOT, "scores")
INFO_ROOT = os.path.join(OUTPUT_ROOT, "info")
PAGE_SIZE = 200

def to_base64(s):
    return base64.b64encode(s.encode("utf-8")).decode("utf-8")

def from_base64(s):
    table = "".maketrans("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.", "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=")
    s = s.translate(table)
    s += "=" * ((4 - len(s) % 4) % 4) #ugh
    return base64.b64decode(s).decode("utf-8")

def ensure_dir_exists(file_path):
    d = os.path.dirname(file_path)
    if not os.path.exists(d):
        os.makedirs(d)

def build_query(page_num, page_size):
    offset = page_num*page_size+1
    return json.dumps({
        "min_rank": offset,
        "num_consecutive_users": page_size
    })

def get_url(round_id, page_num, page_size):
    q = to_base64(build_query(page_num, page_size))
    return URL(round_id, q)

def get_results_by_page(round_id, page_num, page_size):
    url = get_url(round_id, page_num, page_size)
    print(f"GET {url}")
    resp = requests.get(url)
    if resp.status_code != 200:
        raise Exception(resp.text)
    j = from_base64(resp.text)
    j = json.loads(j)
    return json_to_camel_case(j)

def get_scores_by_page(round_id, page_num, page_size):
    return get_results_by_page(round_id, page_num, page_size)["userScores"]

def save_progress(out_file, data):
    print(f"Saving data to {out_file}")
    with open(out_file, "w") as f:
        json.dump(data, f)

def get_score_file_path(round_id):
    return os.path.join(SCORES_ROOT, f"{round_id}.json")

def get_info_file_path(round_id):
    return os.path.join(INFO_ROOT, f"{round_id}.json")

def download_info(round_id):
    info_file = get_info_file_path(round_id)
    if os.path.exists(info_file):
        print(f"The file {info_file} already exists. Please delete it if you want to redownload the info.")
        return
    ensure_dir_exists(info_file)
    results = get_results_by_page(round_id, 0, 0)
    del results["userScores"]
    save_progress(info_file, results)

def get_scoreboard_size(round_id):
    with open(get_info_file_path(round_id), "r") as f:
        res = json.load(f)
        return res["fullScoreboardSize"]

def download_scores(round_id):
    curr_page = 0
    scoreboard_size = get_scoreboard_size(round_id)
    score_file = get_score_file_path(round_id)
    all_scores = []

    if os.path.exists(score_file):
        print(f"The file {score_file} already exists. Please delete it if you want to redownload the scores.")
        return

    ensure_dir_exists(score_file)

    while True:
        scores = get_scores_by_page(round_id, curr_page, PAGE_SIZE)
        if len(scores) == 0:
            break
        all_scores.extend(scores)
        print(f"Downloaded {len(all_scores)}/{scoreboard_size} scoreboard entries")
        if curr_page % 10 == 0:
            save_progress(score_file, all_scores)
        curr_page += 1
    save_progress(score_file, all_scores)

def print_stats(round_id, country):
    RANK_W = 10
    USERNAME_W = 35
    SCORE_W = 5
    out_file = get_score_file_path(round_id)
    with open(out_file, "r") as f:
        results = json.load(f)
        results = [r for r in results if r["country"] == country]
        results = sorted(results, key=lambda x: int(x["rank"]))
        print(f"{len(results)} people from {country} participated")
        print("Results:")
        # print("{:10}|{:10}|{:10}".format("Rank", "Username", "Score"))
        print(f"{'Rank'.center(RANK_W)}|{'Username'.center(USERNAME_W)}|{'Score'.center(SCORE_W)}")
        print(f"{'-'*RANK_W}|{'-'*USERNAME_W}|{'-'*SCORE_W}")
        for r in results:
            print(f"{str(r['rank']).center(RANK_W)}|{str(r['displayname']).center(USERNAME_W)}|{str(r['score1']).center(SCORE_W)}")

if __name__ == "__main__":
    # download_scores()
    # print_stats("Lithuania")

    parser = argparse.ArgumentParser(description="Download results for a Google Code Jam round")
    parser.add_argument("round_id", help="The ID of the round (can be found at the end of the round URL)")
    args = parser.parse_args()
    download_info(args.round_id)
    download_scores(args.round_id)
