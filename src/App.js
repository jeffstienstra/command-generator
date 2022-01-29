import './App.css';
import React from 'react';
import {Checkbox} from '@mui/material';
const _ = require('lodash');


export default function App() {
  const [invulnerability, setInvulnerability] = React.useState(false);
  const [persistence, setPersistence] = React.useState(false);
  const [silent, setSilent] = React.useState(false);
  const [noAi, setNoAi] = React.useState(false);
  const [villagerName, setVillagerName] = React.useState('')
  const [selectedType, setSelectedType] = React.useState('plains');
  const [selectedProfession, setSelectedProfession] = React.useState('unemployed');
  const [selectedLevel, setSelectedLevel] = React.useState('1');
  const [customName, setCustomName] = React.useState('');
  const [isRelative, setIsRelative] = React.useState('true');
  const [xPos, setXPos] = React.useState(0);
  const [yPos, setYPos] = React.useState(1);
  const [zPos, setZPos] = React.useState(0);
  const [xRot, setXRot] = React.useState(0);
  const [yRot, setYRot] = React.useState(0);
  const [outputCommand, setOutputCommand] = React.useState('');

  const regex = /\,(?!\s*?[\{\[\"\'\w])/g;

  const biomes = [
    {value: 'desert', label: 'Desert' },
    {value: 'jungle', label: 'Jungle' },
    {value: 'plains', label: 'Plains' },
    {value: 'savanna', label: 'Savanna' },
    {value: 'snow', label: 'Snow' },
    {value: 'swamp', label: 'Swamp' },
    {value: 'taiga', label: 'Taiga' },
  ]

  const professions = [
    {value: 'unemployed', label: 'None' },
    {value: 'armorer', label: 'Armorer' },
    {value: 'butcher', label: 'Butcher' },
    {value: 'cartographer', label: 'Cartographer' },
    {value: 'cleric', label: 'Cleric' },
    {value: 'farmer', label: 'Farmer' },
    {value: 'fisherman', label: 'Fisherman' },
    {value: 'fletcher', label: 'Fletcher' },
    {value: 'leatherworker', label: 'Leatherworker' },
    {value: 'librarian', label: 'Librarian' },
    {value: 'mason', label: 'Mason' },
    {value: 'nitwit', label: 'Nitwit' },
    {value: 'shepherd', label: 'Shepherd' },
    {value: 'toolsmith', label: 'Toolsmith' },
    {value: 'weaponsmith', label: 'Weaponsmith' },
  ]

  const levels = [
    {value: '1,', label: 'Novice (May change professions)'},
    {value: '2,', label: 'Apprentice'},
    {value: '3,', label: 'Journeyman'},
    {value: '4,', label: 'Expert'},
    {value: '5,', label: 'Master'},
    {value: '99,', label: 'No Default Trades'},
  ]

//             Set Villager Info
// \/===========================================\/
  const handleSetVillagerName = (event) => {
    setVillagerName(event.target.value);
    if (event.target.value !== '') {
      setCustomName(`,CustomName:"\\"${event.target.value}\\""`);
    } else {
      setCustomName('');
    }
  }

  const handleSetProfession = (event) => {
    setSelectedProfession(event.target.value);
  }

    const handleSetLevel = (event) => {
      setSelectedLevel(event.target.value);
    }

  const handleSetBiome = (event) => {
   setSelectedType(event.target.value);
  }

  const handleSetInvulnerability = (event) => {
    if (event.target.checked === true) {
      setInvulnerability(`Invulnerable:1`);
    } else {
      setInvulnerability('');
    }
  }

  const handleSetPersistence = (event) => {
    setPersistence(event.target.checked);
    if (event.target.checked === true) {
      setPersistence(`PersistenceRequired:1`);
    } else {
      setPersistence('');
    }
  }

  const handleSetSilent = (event) => {
    setSilent(event.target.checked);
    if (event.target.checked === true) {
      setSilent(`Silent:1`);
    } else {
      setSilent('');
    }
  }

  const handleSetNoAi = (event) => {
    setNoAi(event.target.checked);
    if (event.target.checked === true) {
      setNoAi(`NoAI:1`);
    } else {
      setNoAi('');
    }
  }

//             Set Positioning
// \/===========================================\/
  const handleSetIsRelative = (event) => {
    console.log('isRelative: ', isRelative);
    if (event.target.value === true) {
      setIsRelative(event.target.value);
    } else {
      setIsRelative(event.target.value);
    }
  }

  const handleSetXPos = (event) => {
    setXPos(event.target.value);
  }

  const handleSetYPos = (event) => {
    setYPos(event.target.value);
  }

  const handleSetZPos = (event) => {
    setZPos(event.target.value);
  }

  const handleSetXRot = (event) => {
    setXRot(event.target.value);
  }

  const handleSetYRot = (event) => {
    setYRot(event.target.value);
  }

//          Set Output Command & Reset
// \/===========================================\/
  const handleReset = (event) => {
    console.log('reset');
    setCustomName('');
    setVillagerName('');
  }

  const handleOnSubmit = (event) => {
    event.preventDefault();

    const position = isRelative === 'true'
      ? `~${xPos} ~${yPos} ~${zPos}`
      : `${xPos} ${yPos} ${zPos}`

    const rotation = xRot === 0 && yRot === 0
    ? ''
    : `,Rotation:[${xRot}f, ${yRot}f]`

    const villagerData =
      // selectedType === 'plains'
      // && selectedProfession === 'unemployed'
      // && selectedLevel === '1'
      // ? '' :
     `VillagerData:{
        type:${selectedType},
        profession:${selectedProfession},
        level:${selectedLevel}
        }`

    const villagerOptions =
      invulnerability === false
      && persistence === false
      && silent === false
      && noAi === false
      && rotation === ''
      && customName === ''
      ? ''
      : `,${invulnerability === false ? '' : invulnerability},
        ${persistence === false ? '' : persistence},
        ${silent === false ? '' : silent},
        ${noAi === false ? '' : noAi},
        ${rotation},
        ${customName},`

    // json stringify
    setOutputCommand(
      ('/summon villager ' + position
      + ' {'
      + villagerData
      + villagerOptions
      + '}').replace(regex, '')
      )
  }

  return (
    <div className='App'>
      {console.log('======================================================')}
      {console.log('levels:', levels)}
      {console.log('villager name:', villagerName)}
      {console.log('profession:', selectedProfession)}
      {console.log('level:', selectedLevel)}
      {console.log('biome:', selectedType)}
      {console.log('invulnerability: ', invulnerability)}
      {console.log('persistence: ', persistence)}
      {console.log('silent: ', silent)}
      {console.log('noAi: ', noAi)}
      {console.log('isRelative: ', isRelative)}
      {console.log('xPos: ', xPos)}
      {console.log('yPos: ', yPos)}
      {console.log('zPos: ', zPos)}
      {console.log('xRot: ', xRot)}
      {console.log('yRot: ', yRot)}
      {console.log('======================================================')}

      <form action=''>
        <h1>Villager Trade Generator</h1>
        <hr />
          <div
            className='mob-options'>
              <h3>Tell Me About Your Villager</h3>
            <div>
              <label htmlFor='villagerName'>Villager Name</label>
              <input
              name='villagerName'
              type='text'
              placeholder='enter name'
              value={villagerName}
              onChange={handleSetVillagerName}
              />
            </div>
            <div>
              <label htmlFor="biome">Biome</label>
              <select name='biome'
                id='biomes'
                value={selectedType}
                onChange={handleSetBiome}>
                  {biomes.map((biome) => (
                    <option key={biome.value} value={biome.value}>{biome.label}</option>
                  ))}
              </select>
            </div>
            <div>
            </div>
            <div>
              <label htmlFor='professions'>Profession</label>
              <select name='professions'
                id='professions'
                value={selectedProfession}
                onChange={handleSetProfession}>
                  {professions.map((profession) => (
                    <option key={profession.value} value={profession.value}>{profession.label}</option>
                    ))}
              </select>
            </div>
              <div>
                <label htmlFor='levels'>Level</label>
                <select name='levels'
                  id='levels'
                  value={selectedLevel}
                  onChange={handleSetLevel}>
                    {levels.map((level) => (
                      <option key={level.value} value={level.value}>{level.label}</option>
                      ))}
                </select>
              </div>
            <img className='villager-image'
              src={require(`./images/villagers/${selectedType}/${selectedProfession}.png`)}
              alt={`${selectedType} ${selectedProfession}`} />
          </div>

  {/* CHECKBOX SELECTORS */}
          <div>
            <div>
              <Checkbox
                className='invulnerability'
                value={invulnerability}
                onChange={handleSetInvulnerability}
                >click it</Checkbox>
              <label htmlFor='invulnerability'>Invulnerable</label>
            </div>
            <div>
              <Checkbox
                className='persistence'
                value={persistence}
                onChange={handleSetPersistence}
                >click it</Checkbox>
              <label htmlFor='persistence'>Persistent</label>
            </div>
            <div>
              <Checkbox
                className='silent'
                value={silent}
                onChange={handleSetSilent}
                >click it</Checkbox>
              <label htmlFor='silent'>Silent</label>
            </div>
            <div>
              <Checkbox
                className='noAi'
                value={noAi}
                onChange={handleSetNoAi}
                >click it</Checkbox>
              <label htmlFor='silent'>NoAI</label>
            </div>
          </div>

  {/* POSITIONING */}
          <div className='position-panel'>
            <div>
              <label htmlFor='relative'>Positioning</label>
              <select name='relative'
                value={isRelative}
                onChange={handleSetIsRelative}>
                    <option value={true}>Relative</option>
                    <option value={false}>Absolute</option>
              </select>
            </div>
            <div>
              <label htmlFor='xpos'>X:</label>
              <input
                name='xpos'
                type='number'
                placeholder='0'
                value={xPos}
                onChange={handleSetXPos}
                />
            </div>
            <div>
              <label htmlFor='ypos'>Y:</label>
              <input
                name='ypos'
                type='number'
                placeholder='0'
                value={yPos}
                onChange={handleSetYPos}
                />
            </div>
            <div>
              <label htmlFor='zpos'>Z:</label>
              <input
                name='zpos'
                type='number'
                placeholder='0'
                value={zPos}
                onChange={handleSetZPos}
                />
            </div>
            <div>
              <label htmlFor='xRot'>xRotation (body rotation):</label>
              <input
                name='xrot'
                type='number'
                placeholder='0'
                value={xRot}
                onChange={handleSetXRot}
                />
            </div>
            <div>
              <label htmlFor='yRot'>yRotation (head tilt: 0=ahead, -90=up, 90=down):</label>
              <input
                name='yrot'
                type='number'
                placeholder='0'
                value={yRot}
                onChange={handleSetYRot}
                />
            </div>

          </div>
          <hr />
          <button onClick={handleOnSubmit}>Generate Command</button>
          <button onClick={handleReset}>Reset</button>
        </form>
        <p value={outputCommand}>{outputCommand}</p>
    </div>
  );
}
