# Unit JSON file


The ensuing document outlines the blueprint for organizing and constructing data pertaining to an individual unit.

To store the unit's JSON file, it should be located within the **collection** directory inside an army folder

The schema below provides a detailed representation of the file structure:


```markdown
├── astartes
│   ├── black-templars
│   │   ├── collection
│   │   │     ├── `castellan.json`
│   │   │     ├── `crusader-squad.json`
│   │   │ 
│   │   ├── `collection.json`
│   │ 
│   ├── blood-angels
│   ├── dark-angels
│   ├── grey-knights
│   ├── space-marines
│   ├── space-wolves
│   │ 
│   ├── `army.json`
│ 
├── chaos
├── imperium
├── xenos
├── `faction.json`

```

## Structure

**"parentUnit"**: String
*Name of the given unit*

e.g.,
`"parentUnit": "crusader squad"`

**"attributes"**:   Array
*An array of objects, each containing the following properties*
 **"name"**: String
>Because some units can be composed with different miniatures, this is the name of a given miniature with a set of characteristics

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

**"rangedWeapons"**: Array
 *An array of objects, each representing a ranged weapon with the following properties*

**"name"**: String.

**"range"**: Numeric.


**"attacks"**: Numeric or String (e.g., "1D6+1").


**"ballistic-skills"**: Numeric or String  (e.g., "N/A").


**"strength"**: Numeric.


 **"armor-penetration"**: Numeric.


 **"damage"**: Numeric.


 **"modifiers"**: An array of strings describing modifiers (e.g., "assault").


>Further information for  **modifiers** will be provided in the future
>
 **"pickOne"**: Boolean.


 
 e.g.,
```markdown
"rangedWeapons": [
{
"name": "astartes shotgun",
"range": 18,
"attacks": 2,
"ballistic-skills": 3,
"strength": 4,
"armor-penetration": 0,
"damage": 1,
"modifiers": ["assault"]
},
{
"name": "bolt pistol",
"range": 12,
"attacks": 1,
"ballistic-skills": 3,
"strength": 4,
"armor-penetration": 0,
"damage": 1,
"modifiers": []
}]
```
**"meleeWeapons"**: An array of objects, each representing a melee weapon with the following properties:

 **"name"**: String.


 **"attacks"**: Numeric.


 **"weapons-skills"**: Numeric.


 **"strength"**: Numeric.


 **"armor-penetration"**: Numeric.


 **"damage"**: Numeric.


 **"modifiers"**: An array of strings describing modifiers (e.g., "devastating wounds")
>Further information for  **modifiers** will be provided in the future
>
 **"pickOne"**: Boolean


**"keywords"**:  Array.


**"factionKeyword"**:  Array.


**"wargear"**:  Array.


**"abilities"**:  Array.






# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
