import os

# Define the content to be added at the end of each file
content_to_add = """
,
    "meleeWeapons": [
        {
            "name": "Piercing claws and talons",
            "attacks": 6,
            "weapons-skills": 2,
            "strength": 6,
            "armor-penetration": 2,
            "damage": 1,
            "modifiers": [
                "precision"
            ]
        }
    ],
    "additionalParameter": {},
    "unitComposition": [
        {
            "unitType": " Adrax Agatone – EPIC HERO",
            "minQuantity": 1,
            "maxQuantity": 1,
            "equipment": [
                " Drakkis",
                "Malleus Noctum"
            ]
        }
    ],
    "options": [
        {
            "count": [
                1
            ],
            "points": 85
        }
    ],
"""

# Specify the directory containing the files
directory = r'C:\Users\JPR\Documents\GitHub\w3-project\public\faction\xenos\tau-empire\collection'

# Iterate through each file in the directory
for filename in os.listdir(directory):
    if filename.endswith(".json"):  # Assuming the files have a .json extension
        filepath = os.path.join(directory, filename)
        # Open the file and append the content at the end
        with open(filepath, 'a') as file:
            file.write(content_to_add)
        print(f"Content added to {filename}")

print("All files processed.")