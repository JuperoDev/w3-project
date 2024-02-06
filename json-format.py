import os
import json

# Function to recursively replace "weapons-skills" with "ballistic-skills" in a JSON object
def replace_skills_in_object(data):
    if isinstance(data, dict):
        for key, value in data.items():
            if key == "rangedWeapons" and isinstance(value, list):
                for weapon in value:
                    if isinstance(weapon, dict) and "weapons-skills" in weapon:
                        weapon["ballistic-skills"] = weapon.pop("weapons-skills")
            else:
                replace_skills_in_object(value)
    elif isinstance(data, list):
        for item in data:
            replace_skills_in_object(item)

# Function to replace "weapons-skills" with "ballistic-skills" in a JSON file
def replace_skills_in_json(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as json_file:
            data = json.load(json_file)
    except (FileNotFoundError, json.JSONDecodeError):
        # Skip the file if it's not found or has invalid JSON data
        return

    replace_skills_in_object(data)

    with open(file_path, 'w', encoding='utf-8') as json_file:
        json.dump(data, json_file, indent=4, ensure_ascii=False)

# Function to process the 'public/faction' folder and its subfolders
def process_folder():
    # Determine the root directory where the script is located
    script_directory = os.path.dirname(os.path.abspath(__file__))
    
    # Construct the folder path by joining script_directory with 'public' and 'faction'
    folder_path = os.path.join(script_directory, 'public', 'faction')

    # Recursively search and process JSON files in the specified folder
    for root, _, files in os.walk(folder_path):
        for file_name in files:
            if file_name.endswith('.json'):
                file_path = os.path.join(root, file_name)
                replace_skills_in_json(file_path)

if __name__ == "__main__":
    # Call the process_folder function to start processing JSON files in the 'public/faction' folder
    process_folder()
