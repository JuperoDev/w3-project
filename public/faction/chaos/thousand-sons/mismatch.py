import os
import json

# Load the collection.json file from the root directory
root_folder = "."
collection_file = os.path.join(root_folder, "collection.json")

with open(collection_file, "r") as f:
    collection_data = json.load(f)

# Create a list to store mismatches
mismatches = []

# Combine all units from characters, battleline, dedicatedTransports, and other
units = []
for section in ["characters", "battleline", "dedicatedTransports", "other"]:
    units.extend(collection_data.get(section, []))

# Iterate through each unit and compare with corresponding file in the collection folder
for unit in units:
    unit_name = unit["unitName"]
    basic_points = unit["basicPoints"]

    # Generate the file path by converting unit name to lowercase and replacing spaces with hyphens
    file_name = unit_name.lower().replace(" ", "-").replace("'", "").replace("é", "e") + ".json"
    file_path = os.path.join(root_folder, "collection", file_name)

    # Check if the file exists
    if os.path.exists(file_path):
        with open(file_path, "r") as f:
            unit_data = json.load(f)

        # Extract points from the options section
        options = unit_data.get("options", [])
        if options:
            option_points = options[0].get("points", None)

            # Compare points and log mismatches
            if option_points is not None and option_points != basic_points:
                mismatches.append(f"Mismatch in {file_name}: Basic Points = {basic_points}, Option Points = {option_points}")
    else:
        mismatches.append(f"File not found: {file_name}")

# Write mismatches to a text file
output_file = os.path.join(root_folder, "mismatches.txt")
with open(output_file, "w") as f:
    for mismatch in mismatches:
        f.write(mismatch + "\n")

print(f"Completed. Found {len(mismatches)} mismatches. Check mismatches.txt for details.")
