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
                for category in ['meleeWeapons', 'rangedWeapons']:
                    if category in data:
                        weapon_names = set()
                        new_weapons = []
                        for weapon in data[category]:
                            if weapon['name'] not in weapon_names:
                                weapon_names.add(weapon['name'])
                                new_weapons.append(weapon)
                        data[category] = new_weapons
                file.seek(0)
                json.dump(data, file, indent=4)
                file.truncate()

folder_path = r"C:\Users\JPR\Documents\GitHub\w3-project\public\faction\chaos\death-guard\collection"  # Change this to the path of your JSON folder
remove_duplicates(folder_path)
