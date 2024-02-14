import os
import json

# Define the directory path
directory = r"C:\Users\JPR\Documents\GitHub\w3-project\public\faction\astartes\dark-angels\collection"

# Function to replace unicode character with apostrophe in JSON
def replace_unicode_in_json(json_data):
    if isinstance(json_data, dict):
        for key, value in json_data.items():
            # Replace unicode character in keys
            new_key = key.replace("\u2019", "'")
            # If value is a string, replace unicode character in values
            if isinstance(value, str):
                json_data[new_key] = value.replace("\u2019", "'")
            # Recursively call for nested dictionaries
            elif isinstance(value, dict):
                json_data[new_key] = replace_unicode_in_json(value)
            # Recursively call for lists with dictionaries
            elif isinstance(value, list):
                json_data[new_key] = [replace_unicode_in_json(item) for item in value]
            # If value is not a string or dictionary, keep it as is
            else:
                json_data[new_key] = value
            # If the key was changed, delete the old key
            if new_key != key:
                del json_data[key]
    return json_data

# Navigate to the directory
os.chdir(directory)

# Get the list of JSON files in the directory
json_files = [file for file in os.listdir() if file.endswith('.json')]

# Iterate through each JSON file and replace unicode characters
for json_file in json_files:
    with open(json_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    updated_data = replace_unicode_in_json(data)
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(updated_data, f, indent=4, ensure_ascii=False)
    print(f"Updated '{json_file}'")
