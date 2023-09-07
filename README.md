# Unit JSON file

The ensuing document outlines the blueprint for organizing and constructing data pertaining to an individual unit.

To store the unit's JSON file, it should be located within the **collection** directory inside an army folder

The schema below provides a detailed representation of the file structure:

```markdown
├── astartes
│ ├── black-templars
│ │ ├── collection
│ │ │ ├── `castellan.json`
│ │ │ ├── `crusader-squad.json`
│ │ │
│ │ ├── `collection.json`
│ │
│ ├── blood-angels
│ ├── dark-angels
│ ├── grey-knights
│ ├── space-marines
│ ├── space-wolves
│ │
│ ├── `army.json`
│
├── chaos
├── imperium
├── xenos
├── `faction.json`
```

## Structure

### Unit Profile

**"parentUnit"**: String
_Name of the given unit_

e.g.,
`"parentUnit": "crusader squad"`

**"attributes"**: Array
_An array of objects, each containing the following properties_
**"name"**: String

> Because some units can be composed with different miniatures, this is the name of a given miniature with a set of characteristics

**"movement"**: Numeric.

**"toughness"**: Numeric.

**"save"**: Numeric.

**"wounds"**: Numeric.

**"leadership"**: Numeric.

**"objectiveControl"**: Numeric.

**"invulnerableSave"**: Numeric.

e.g.,

```markdown
"attributes": [
{
"name": "neophytes",
"movement": 6,
"toughness": 4,
"save": 4,
"wounds": 2,
"leadership": 6,
"objetiveControl": 2,
"invulnerableSave": 0
},
{
"name": "other units",
"movement": 6,
"toughness": 4,
"save": 3,
"wounds": 2,
"leadership": 6,
"objetiveControl": 2,
"invulnerableSave": 0
}]
```
### Ranged Weapons.

**"rangedWeapons"**: Array
_An array of objects, each representing a ranged weapon with the following properties_

**"name"**: String.

**"range"**: Numeric.

**"attacks"**: Numeric or String (e.g., "1D6+1").

**"ballistic-skills"**: Numeric or String (e.g., "N/A").

**"strength"**: Numeric.

**"armor-penetration"**: Numeric.

**"damage"**: Numeric.

**"modifiers"**: An array of strings describing modifiers (e.g., "assault").

> Further information for **modifiers** will be provided in the future
>
 **"singleChoice"**: Boolean.

e.g.,

```markdown
"rangedWeapons": [
{
"name": "astartes shotgun",
"range": 18,
"attacks": 2,
"ballistic-skills": 3,
"strength": 4,
"armor-penetration": 2,
"damage": 1,
"modifiers": ["assault"],
"singleChoice": false
},
{
"name": "flamer",
"range": 12,
"attacks": "d6",
"ballistic-skills": "N/A",
"strength": 4,
"armor-penetration": 0,
"damage": 1,
"modifiers": [
"ignores cover",
"torrent"
],
"singleChoice": false
}]
```
### Melee Weapons.

**"meleeWeapons"**: An array of objects, each representing a melee weapon with the following properties:

**"name"**: String.

**"attacks"**: Numeric.

**"weapons-skills"**: Numeric.

**"strength"**: Numeric.

**"armor-penetration"**: Numeric.

**"damage"**: Numeric.

**"modifiers"**: An array of strings describing modifiers (e.g., "devastating wounds")

> Further information for **modifiers** will be provided in the future
>
 **"singleChoice"**: Boolean

```markdown
 "meleeWeapons": [
    {
      "name": "astartes chainsword",
      "attacks": 3,
      "weapons-skills": 3,
      "strength": 4,
      "armor-penetration": 1,
      "damage": 1,
      "modifiers": [],
      "singleChoice": true
    },
    {
      "name": "combat knife",
      "attacks": 3,
      "weapons-skills": 3,
      "strength": 4,
      "armor-penetration": 0,
      "damage": 1,
      "modifiers": [],
      "singleChoice": true
    }]
```
### Keywords

**"keywords"**: Array.

**"factionKeyword"**: Array.

### Wargear Options

**"wargear"**: Array.

### Abilities

**"abilities"**: Array.

### Unit Composition

