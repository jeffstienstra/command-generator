import './App.css';
import React, { useState, Component } from 'react';
import Select from 'react-select';
import { render } from '@testing-library/react';
// import Button from '@mui/material/Button';
// import Select from '@mui/material/Select'
// import MenuItem from '@mui/material/MenuItem'

export default function App() {
  const [selectedType, setSelectedType] = React.useState('plains');
  const [selectedLevel, setSelectedLevel] = React.useState(1);
  const [selectedProfession, setSelectedProfession] = React.useState('fisherman');
  const [villagerName, setVillagerName] = React.useState('')
  const [customName, setCustomName] = React.useState({
    CustomName:''
  });
  const [VillagerData, setVillagerData] = React.useState({

    VillagerData:{
      profession:selectedProfession,
      level:selectedLevel,
      type:selectedType,
    }

  })
  // const [coordinates, setCoordinates] = React.useState()
  const [outputCommand, setOutputCommand] = React.useState('')

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
    {value: 1, label: 'Novice (May change professions)'},
    {value: 2, label: 'Apprentice'},
    {value: 3, label: 'Journeyman'},
    {value: 4, label: 'Expert'},
    {value: 5, label: 'Master'},
  ]

  console.log('outputCommand: ', outputCommand);

  const handleSetBiome = (event) => {
   setSelectedType(event.target.value);
  }

  const handleSetLevel = (event) => {
    setSelectedLevel(event.target.value);
  }

  const handleSetProfession = (event) => {
    setSelectedProfession(event.target.value);
  }

  const handleSetVillagerName = (event) => {
    setVillagerName(event.target.value);
    setCustomName({CustomName:`"\\"${villagerName}\\""`});
  }

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setOutputCommand(`/summon villager ~ ~1 ~ {VillagerData:{profession:${selectedProfession},level:${selectedLevel},type:${selectedType}},CustomName:"\\"${villagerName}\\""}`);
    console.log('outputCommand: ', outputCommand);
  }

  const handleReset = (event) => {
    console.log('reset');
  }

  return (
    <div className='App'>
      {console.log('profession:', selectedProfession)}
      {console.log('level:', selectedLevel)}
      {console.log('biome:', selectedType)}
      {console.log('villager name:', villagerName)}
      {console.log(customName)}
      <form action=''>
        <h1>Villager Trade Generator</h1>
          <div>
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
          <button onClick={handleOnSubmit}>Generate Command</button>
          <button onClick={handleReset}>Reset</button>
        </form>
        <p value={outputCommand} name="" id="" cols="30" rows="10">{outputCommand}</p>
    </div>
  );
}
