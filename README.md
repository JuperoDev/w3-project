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

```json
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

```json
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

**"meleeWeapons"**: Array.

_An array of objects, each representing a melee weapon with the following properties:_

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

```json
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

```json
    "keywords": [
        "infantry",
        "psyker",
        "great devourer",
        "fly",
        "synapse",
        "zoanthropes"
    ]
  ```
    
**"factionKeyword"**: Array.


```json
  "factionKeyword": [
    "Adeptus Astartes",
    "Black Templars"
  ]
```

_Both properties are String Arrays_

### Wargear Options

**"wargear"**: Array.

_An array of objects, each representing different weapons composition for one or more miniatures in that unit_

**"description"**: String.

**"items"**: Array.

```json
"wargear": [
    {
      "description": "The Sword Brother’s bolt pistol and boltgun can be replaced with 1 twin lightning claws or two different weapons from the following list",
      "items": [
        "1 Astartes chainsword",
        "1 bolt pistol",
        "1 boltgun",
        "1 combi-weapon",
        "1 grav-pistol",
        "1 hand flamer",
        "1 inferno pistol",
        "1 plasma pistol",
        "1 power fist",
        "1 power weapon",
        "1 storm bolter",
        "1 thunder hammer"
      ]
    },
    {
      "description": "Any number of Neophytes can each have their boltgun replaced with one of the following: ",
      "items": [
        "1 Astartes chainsword",
        "1 bolt pistol",
        "1 boltgun",
        "1 combi-weapon",
        "1 grav-pistol",
        "1 hand flamer",
        "1 inferno pistol",
        "1 plasma pistol",
        "1 power fist",
        "1 power weapon",
        "1 storm bolter",
        "1 thunder hammer"
      ]
    },
    {
      "description": "Any number of Initiates can each have their boltgun replaced with 1 Astartes chainsword.",
      "items": [
        ""
      ]
    },
    {
      "description": "1 Initiate’s boltgun can be replaced with one of the following:",
      "items": [
        "1 flamer",
        "1 plasma gun",
        "1 meltagun",
        "1 grav-gun"
      ]
    },
    {
      "description": "1 Initiate’s boltgun can be replaced with one of the following",
      "items": [
        "1 power weapon",
        "1 power fist",
        "1 heavy bolter",
        "1 heavy flamer",
        "1 grav-cannon",
        "1 lascannon",
        "1 missile launcher",
        "1 multi-melta",
        "1 plasma cannon"
      ]
    }
  ]
```

### Abilities

**"abilities"**: Array.

_An array of arrays, Basic, Faction and Other Abilities_

### Damaged

### Unit Composition

### Leader

### Additional Parameters

**"additionalParameter"**: Array.

_A property string and an array of objects, they describe additional abilities that may be present and the title of this particular set_

**"title"**: String.

**"abilities"**: Array.

**"name"**: String.

**"description"**: String.

```json
"additionalParameter": {
  "title": "Author of the codex",
  "abilities":
    [
      {
      "name": "primarch of the xiii (aura)",
      "description": "while a friendly adeptus astartes is withing..."
    },
  {
      "name": "supreme strategist",
      "description": "oce per turn, you can get one friendly adeptus astartes..."
    },
    ]}
```

### Lore

**"lore"**: String.

_A background story or information for a given unit_

```json
 "lore": "Hive Guard are spawned to protect Tyranid bio-architecture and vital spore-seeding sites. They carry a monstrous arsenal of grafted bio-weapons and are instinctively driven – or sometimes synaptically impelled – to lay down heavy hails of firepower against those prey organisms the Hive Mind wishes to see eradicated. "
```
