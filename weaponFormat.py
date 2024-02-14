import os
import json

def merge_stats(ranged_file, melee_file):
    with open(ranged_file, 'r', encoding='utf-8') as f:
        ranged_data = json.load(f)
    with open(melee_file, 'r', encoding='utf-8') as f:
        melee_data = json.load(f)

    for ranged_weapon in ranged_data.get('rangedWeapons', []):
        for melee_weapon in melee_data.get('meleeWeapons', []):
            if ranged_weapon['name'] == melee_weapon['name']:
                # Merge stats
                ranged_weapon['attacks'] = melee_weapon.get('attacks', ranged_weapon.get('attacks'))
                ranged_weapon['armor-penetration'] = melee_weapon.get('armor-penetration', ranged_weapon.get('armor-penetration'))
                ranged_weapon['damage'] = melee_weapon.get('damage', ranged_weapon.get('damage'))
                ranged_weapon['ballistic-skills'] = melee_weapon.get('weapons-skills', ranged_weapon.get('ballistic-skills'))

    # Write the modified ranged data back to the file
    with open(ranged_file, 'w', encoding='utf-8') as f:
        json.dump(ranged_data, f, indent=4)

def process_files(folder_path):
    for filename in os.listdir(folder_path):
        if filename.endswith('.json'):
            file_path = os.path.join(folder_path, filename)
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            if 'rangedWeapons' in data and 'meleeWeapons' in data:
                merge_stats(file_path, file_path)

if __name__ == "__main__":
    folder_path = r"C:\Users\JPR\Documents\GitHub\w3-project\public\faction\astartes\dark-angels\collection"
    process_files(folder_path)
