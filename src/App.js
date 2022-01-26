import './App.css';
import React, { useState, Component } from 'react';
import Select from 'react-select';
import { render } from '@testing-library/react';
import { Checkbox, checkboxClasses } from '@mui/material';

export default function App() {
  const [invulnerability, setInvulnerability] = React.useState(false);
  const [persistence, setPersistence] = React.useState(false);
  const [silent, setSilent] = React.useState(false);
  const [noAi, setNoAi] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState('');
  const [selectedLevel, setSelectedLevel] = React.useState('1');
  const [selectedProfession, setSelectedProfession] = React.useState('');
  const [villagerName, setVillagerName] = React.useState('')
  const [customName, setCustomName] = React.useState('');
  const [isRelative, setIsRelative] = React.useState('true');
  const [xPos, setXPos] = React.useState(0);
  const [yPos, setYPos] = React.useState(1);
  const [zPos, setZPos] = React.useState(0);
  const [xRot, setXRot] = React.useState(0);
  const [yRot, setYRot] = React.useState(0);
  const [rotation, setRotation] = React.useState('');
  const [position, setPosition] = React.useState(`~${xPos} ~${yPos} ~${zPos}`);
  const [outputCommand, setOutputCommand] = React.useState('');

  const biomes = [
    {value: 'type:desert', label: 'Desert' },
    {value: 'type:jungle', label: 'Jungle' },
    {value: '', label: 'Plains' },
    {value: 'type:savanna', label: 'Savanna' },
    {value: 'type:snow', label: 'Snow' },
    {value: 'type:swamp', label: 'Swamp' },
    {value: 'type:taiga', label: 'Taiga' },
  ]

  const professions = [
    {value: '', label: 'None' },
    {value: 'profession:armorer,', label: 'Armorer' },
    {value: 'profession:butcher,', label: 'Butcher' },
    {value: 'profession:cartographer,', label: 'Cartographer' },
    {value: 'profession:cleric,', label: 'Cleric' },
    {value: 'profession:farmer,', label: 'Farmer' },
    {value: 'profession:fisherman,', label: 'Fisherman' },
    {value: 'profession:fletcher,', label: 'Fletcher' },
    {value: 'profession:leatherworker,', label: 'Leatherworker' },
    {value: 'profession:librarian,', label: 'Librarian' },
    {value: 'profession:mason,', label: 'Mason' },
    {value: 'profession:nitwit,', label: 'Nitwit' },
    {value: 'profession:shepherd,', label: 'Shepherd' },
    {value: 'profession:toolsmith,', label: 'Toolsmith' },
    {value: 'profession:weaponsmith,', label: 'Weaponsmith' },
  ]

  const levels = [
    {value: 'level:1,', label: 'Novice (May change professions)'},
    {value: 'level:2,', label: 'Apprentice'},
    {value: 'level:3,', label: 'Journeyman'},
    {value: 'level:4,', label: 'Expert'},
    {value: 'level:5,', label: 'Master'},
    {value: 'level:99,', label: 'No Default Trades'},
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

//             Set Positioning
// \/===========================================\/
  const handleSetIsRelative = (event) => {
    console.log('event.target.value: ',event.target.value);
    console.log('isRelative: ', isRelative);
    console.log('position: ', position);
    if (event.target.value === 'true') {
      setIsRelative(event.target.value);
      setPosition(`~${xPos} ~${yPos} ~${zPos}`);
    } else {
      setIsRelative(event.target.value);
      setPosition(`${xPos} ${yPos} ${zPos}`);
    }
  }

  const handleSetXPos = (event) => {
    setXPos(event.target.value);
    isRelative === 'true'
    ? setPosition(`~${event.target.value} ~${yPos} ~${zPos}`)
    : setPosition(`${event.target.value} ${yPos} ${zPos}`)
  }

  const handleSetYPos = (event) => {
    setYPos(event.target.value);
    isRelative === 'true'
      ? setPosition(`~${xPos} ~${event.target.value} ~${zPos}`)
      : setPosition(`${xPos} ${event.target.value} ${zPos}`)
  }

  const handleSetZPos = (event) => {
    setZPos(event.target.value);
    isRelative === 'true'
    ? setPosition(`~${xPos} ~${yPos} ~${event.target.value}`)
    : setPosition(`${xPos} ${yPos} ${event.target.value}`)
  }

  const handleSetXRot = (event) => {
    // Rotation:[-80f,-90f]
    setXRot(event.target.value);
    setRotation(`,Rotation:[${event.target.value}f,${yRot}f]`)
  }

  const handleSetYRot = (event) => {
    setYRot(event.target.value);
    setRotation(`,Rotation:[${xRot}f,${event.target.value}f]`)
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
    setOutputCommand(`/summon villager ${position}
      ${selectedProfession !== '' || selectedType !== '' || rotation !== '' ? '{VillagerData:{' : ''}
        ${selectedProfession !== '' ? selectedProfession : ''}
        ${selectedProfession !== '' ? selectedLevel : ''}
        ${selectedType === '' ? '' : selectedType}
      ${selectedProfession !== '' || selectedType !== '' || rotation !== '' ? '}' : ''}
        ${rotation !== 0 ? rotation : ''}
        ${invulnerability ? invulnerability : ''}
        ${persistence ? persistence : ''}
        ${silent ? silent : ''}
        ${noAi ? noAi : ''}
        ${villagerName ? customName : ''}
      ${selectedProfession !== '' || selectedType !== ''  || rotation !== '' ? '}' : ''}`)
  }

  return (
    <div className='App'>
      {console.log('======================================================')}
      {console.log('villager name:', villagerName)}
      {console.log('profession:', selectedProfession)}
      {console.log('level:', selectedLevel)}
      {console.log('biome:', selectedType)}
      {console.log('customName: ', customName)}
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
      {console.log('position: ', position)}
      {console.log('rotation: ', rotation)}
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
            {(selectedProfession !== '') && (
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
            )}
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
  {/* <img src="/images-villagers/Desert_Villager_Base.png" alt="desert villager" /> */}
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
