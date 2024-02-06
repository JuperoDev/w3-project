import os
import json

# Description: This Python script recursively searches through all JSON files
#              in a public/faction and its subfolders. It replaces "weapons-skills"
#              with "ballistic-skills" inside the "rangedWeapons" list if found.



def replace_skills_in_json(file_path):
    # Open the JSON file for reading
    with open(file_path, 'r') as json_file:
        data = json.load(json_file)

    # Check if the 'rangedWeapons' key exists in the JSON data
    if 'rangedWeapons' in data:
        # Iterate through each weapon in the 'rangedWeapons' list
        for weapon in data['rangedWeapons']:
            # Check if 'weapons-skills' key exists in the weapon
            if 'weapons-skills' in weapon:
                # Replace 'weapons-skills' with 'ballistic-skills'
                weapon['weapons-skills'] = 'ballistic-skills'

    # Open the JSON file for writing with the updated data
    with open(file_path, 'w') as json_file:
        json.dump(data, json_file, indent=4)

# Function to process a folder and its subfolders
def process_folder(folder_path):
    # Recursively walk through the folder and its subfolders
    for root, _, files in os.walk(folder_path):
        for file_name in files:
            # Check if the file has a .json extension
            if file_name.endswith('.json'):
                # Construct the full path of the JSON file
                file_path = os.path.join(root, file_name)
                # Call the replace_skills_in_json function to update the file
                replace_skills_in_json(file_path)

# Main entry point of the script
if __name__ == "__main__":
    # Define the root path where the Python script is located
    root_path = '/path/to/your/root'  # Replace with the actual root path
    # Construct the folder path by joining root_path with 'public' and 'faction'
    folder_path = os.path.join(root_path, 'public', 'faction')
    # Call the process_folder function to start processing JSON files in the specified folder
    process_folder(folder_path)
