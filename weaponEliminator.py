import os
import json

def remove_duplicates(folder_path):
    # Iterate over each file in the folder
    for filename in os.listdir(folder_path):
        filepath = os.path.join(folder_path, filename)
        if os.path.isfile(filepath) and filepath.endswith('.json'):
            # Process JSON files
            with open(filepath, 'r+') as file:
                data = json.load(file)
                if 'meleeWeapons' in data and 'rangedWeapons' in data:
                    melee_weapon_names = set(weapon['name'] for weapon in data['meleeWeapons'])
                    ranged_weapon_names = set(weapon['name'] for weapon in data['rangedWeapons'])
                    shared_weapon_names = melee_weapon_names.intersection(ranged_weapon_names)
                    # Remove shared weapons from meleeWeapons
                    data['meleeWeapons'] = [weapon for weapon in data['meleeWeapons'] if weapon['name'] not in shared_weapon_names]
                file.seek(0)
                json.dump(data, file, indent=4)
                file.truncate()

folder_path = r"C:\Users\JPR\Documents\GitHub\w3-project\public\faction\astartes\black-templars\collection"  # Change this to the path of your JSON folder
remove_duplicates(folder_path)
