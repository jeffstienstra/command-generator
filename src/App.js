import './App.css';
import React, { useState, Component } from 'react';
import Select from 'react-select';
import { render } from '@testing-library/react';
import { Checkbox, checkboxClasses } from '@mui/material';
// import Button from '@mui/material/Button';
// import Select from '@mui/material/Select'
// import MenuItem from '@mui/material/MenuItem'

export default function App() {
  const [invulnerability, setInvulnerability] = React.useState(false);
  const [persistence, setPersistence] = React.useState(false);
  const [silent, setSilent] = React.useState(false);
  const [noAi, setNoAi] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState('plains');
  const [selectedLevel, setSelectedLevel] = React.useState('1');
  const [selectedProfession, setSelectedProfession] = React.useState('fisherman');
  const [villagerName, setVillagerName] = React.useState('')
  const [customName, setCustomName] = React.useState('');
  const [xPos, setXPos] = React.useState(0);
  const [yPos, setYPos] = React.useState(1);
  const [zPos, setZPos] = React.useState(0);
  const [isRelative, setIsRelative] = React.useState(true);
  const [relativePosition, setRelativePosition] = React.useState(`~${xPos} ~${yPos} ~${zPos}`);
  const [absolutePosition, setAbsolutePosition] = React.useState(`${xPos} ${yPos} ${zPos}`);

  const [outputCommand, setOutputCommand] = React.useState('');

  const biomes = [
    {value: 'plains', label: 'Plains' },
    {value: 'desert', label: 'Desert' },
    {value: 'savanna', label: 'Savanna' },
    {value: 'taiga', label: 'Taiga' },
    {value: 'swamp', label: 'Swamp' },
    {value: 'jungle', label: 'Jungle' },
  ]

  const professions = [
    {value: 'farmer', label: 'Farmer' },
    {value: 'fisherman', label: 'Fisherman' },
    {value: 'shepherd', label: 'Shepherd' },
    {value: 'fletcher', label: 'Fletcher' },
    {value: 'librarian', label: 'Librarian' },
    {value: 'cartographer', label: 'Cartographer' },
    {value: 'cleric', label: 'Cleric' },
    {value: 'armorer', label: 'Armorer' },
    {value: 'weaponsmith', label: 'Weaponsmith' },
    {value: 'toolsmith', label: 'Toolsmith' },
    {value: 'butcher', label: 'Butcher' },
    {value: 'leatherworker', label: 'Leatherworker' },
    {value: 'mason', label: 'Mason' },
    {value: 'nitwit', label: 'Nitwit' },
  ]

  const levels = [
    {value: '1', label: 'Novice (May change professions)'},
    {value: '2', label: 'Apprentice'},
    {value: '3', label: 'Journeyman'},
    {value: '4', label: 'Expert'},
    {value: '5', label: 'Master'},
  ]

  console.log('outputCommand: ', outputCommand);

  const handleSetBiome = (event) => {
   setSelectedType(event.target.value);
  }

  const handleSetLevel = (event) => {
    setSelectedLevel(event.target.value);
  }

  const handleSetIsRelative = (event) => {
    setIsRelative(event.target.value);
  }

  const handleSetProfession = (event) => {
    setSelectedProfession(event.target.value);
  }

  const handleSetVillagerName = (event) => {
    setVillagerName(event.target.value);
    if (event.target.value !== '') {
      setCustomName(`,CustomName:"\\"${event.target.value}\\""`);
    } else {
      setCustomName('');
    }
    }

  const handleSetXPos = (event) => {
    setXPos(event.target.value);
    setAbsolutePosition(`${event.target.value} ${yPos} ${zPos}`)
    setRelativePosition(`~${event.target.value} ~${yPos} ~${zPos}`)
    }

  const handleSetYPos = (event) => {
    setYPos(event.target.value);
    setAbsolutePosition(`${xPos} ${event.target.value} ${zPos}`)
    setRelativePosition(`~${xPos} ~${event.target.value} ~${zPos}`)
    }

    const handleSetZPos = (event) => {
      setZPos(event.target.value);
      setAbsolutePosition(`${xPos} ${yPos} ${event.target.value}`)
      setRelativePosition(`~${xPos} ~${yPos} ~${event.target.value}`)
      }

  const handleReset = (event) => {
    console.log('reset');
    setCustomName('');
    setVillagerName('');
  }

  const handleSetInvulnerability = (event) => {
    setInvulnerability(event.target.checked);
    if (event.target.checked === true) {
      setInvulnerability(`,Invulnerable:1`);
    } else {
      setInvulnerability('');
    }
  }

  const handleSetPersistence = (event) => {
    setPersistence(event.target.checked);
    if (event.target.checked === true) {
      setPersistence(`,PersistenceRequired:1`);
    } else {
      setPersistence('');
    }
  }

  const handleSetSilent = (event) => {
    setSilent(event.target.checked);
    if (event.target.checked === true) {
      setSilent(`,Silent:1`);
    } else {
      setSilent('');
    }
  }

  const handleSetNoAi = (event) => {
    setNoAi(event.target.checked);
    if (event.target.checked === true) {
      setNoAi(`,NoAI:1`);
    } else {
      setNoAi('');
    }
  }

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setOutputCommand(`/summon villager ${isRelative ? relativePosition : absolutePosition}
      {VillagerData:{
        profession:${selectedProfession},
        level:${selectedLevel},
        type:${selectedType}}
        ${invulnerability ? invulnerability : ''}
        ${persistence ? persistence : ''}
        ${silent ? silent : ''}
        ${noAi ? noAi : ''}
        ${villagerName ? customName : ''}
      }`)
  }

  return (
    <div className='App'>
      {console.log('=====================================')}
      {console.log('profession:', selectedProfession)}
      {console.log('level:', selectedLevel)}
      {console.log('biome:', selectedType)}
      {console.log('villager name:', villagerName)}
      {console.log('customName: ', customName)}
      {console.log('invulnerability: ', invulnerability)}
      {console.log('persistence: ', persistence)}
      {console.log('silent: ', silent)}
      {console.log('noAi: ', noAi)}
      {console.log('xPos: ', xPos)}
      {console.log('yPos: ', yPos)}
      {console.log('zPos: ', zPos)}
      {console.log('isRelative: ', isRelative)}
      {console.log('relativePosition: ', relativePosition)}
      {console.log('absolutePosition: ', absolutePosition)}

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
          </div>
          <hr />
          <button onClick={handleOnSubmit}>Generate Command</button>
          <button onClick={handleReset}>Reset</button>
        </form>
        <p value={outputCommand} name="" id="" cols="30" rows="10">{outputCommand}</p>
    </div>
  );
}
