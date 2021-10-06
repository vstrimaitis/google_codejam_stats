def to_camel_case(s):
    parts = [x for x in s.split("_") if len(x) > 0]
    return parts[0] + "".join(x.title() for x in parts[1:])

def json_to_camel_case(obj):
    if not isinstance(obj, dict):
        return obj
    new_obj = {}
    for k in obj:
        v = obj[k]
        res = v
        if isinstance(v, dict):
            res = json_to_camel_case(v)
        elif isinstance(v, list):
            res = [json_to_camel_case(x) for x in v]
        new_obj[to_camel_case(k)] = res
    return new_obj
