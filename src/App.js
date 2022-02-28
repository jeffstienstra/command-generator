import './App.css';
import {useState} from 'react';
import {Checkbox} from '@mui/material';
import biomes from './data/biomes'
import rawEffects from './data/effects'
import items from './data/items'
import levels from './data/levels'
import professions from './data/professions'
import workstations from './data/workstations'

const {handleInputChange} = require('./helpers/hooks-helper');
const {handleSetInvulnerability, handleSetIsRelative, handleSetPersistence, handleSetSilent, handleSetNoAi} = require('./helpers/villager-properties-helper');
const _ = require('lodash');

export default function App() {
  // const [activeEffects, setActiveEffects] = useState('');
  const [customName, setCustomName] = useState('');
  const [invulnerability, setInvulnerability] = useState(false);
  const [isRelative, setIsRelative] = useState('true');
  const [noAi, setNoAi] = useState(false);
  const [persistence, setPersistence] = useState(false);
  const [selectedBuyItem1, setSelectedBuyItem1] = useState({});
  const [selectedBuyItem2, setSelectedBuyItem2] = useState({});
  const [selectedSellItem1, setSelectedSellItem1] = useState({});
  const [effects, setEffects] = useState(rawEffects.map((effect) => effect));
  const [selectedProfession, setSelectedProfession] = useState('unemployed');
  const [selectedLevel, setSelectedLevel] = useState('1');
  const [selectedType, setSelectedType] = useState('plains');
  const [silent, setSilent] = useState(false);
  const [villagerName, setVillagerName] = useState('')
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(1);
  const [zPos, setZPos] = useState(0);
  const [xRot, setXRot] = useState(0);
  const [yRot, setYRot] = useState(0);
  const [buyItem1Count, setBuyItem1Count] = useState(1);
  const [buyItem2Count, setBuyItem2Count] = useState(1);
  const [sellItem1Count, setSellItem1Count] = useState(1);
  const [outputCommand, setOutputCommand] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [recipe, setRecipe] = useState({});

  const regex = /\,(?!\s*?[\{\[\"\'\w])/g;
  const removeComma = '[,{'
  const replaceComma = 'f-'

  const fullItemList = items.map((item) => {
    return {
      label: item.name,
      value: item.namespacedId,
      image: item.image,
      stackSize: item.stackSize
    }
  });
  const itemList = _.uniq(_.without(_.map(fullItemList),undefined,null,''), 'value');

  const stackSize64 = [
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
    50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    60, 61, 62, 63, 64
  ]

//             Set Villager Info
// \/===========================================\/
  const handleSetVillagerName = (event) => {
    setVillagerName(event.target.value);
    if (event.target.value !== '') {
      setCustomName(`CustomName:"\\"${event.target.value}\\""`);
    } else {
      setCustomName('');
    }
  }

  const handleAddEffect = (event) => {
    console.log('clicked', event.target.value);
    setEffects(effects.map(effect =>
      effect.namespacedId === event.target.value
      ? {
          name: effect.name,
          description: effect.description,
          id: effect.id,
          namespacedId: effect.namespacedId,
          isActiveEffect: true,
          amplifier: effect.amplifier,
          duration: effect.duration
        }
      : effect
    ))
  }

  const handleAmplifierChange = (effect) => {
    return (event) => {
      if (event.target.value > 255) {
        effect.amplifier = 255;
      } else if (event.target.value < 0) {
        effect.amplifier = 0;
      } else {
        effect.amplifier = event.target.value;
        setEffects([...effects])
      }
    }
  }

  const handleDurationChange = (effect) => {
    return (event) => {
      if (event.target.value > 1000000) {
        effect.duration = 1000000;
      } else if (event.target.value < 1) {
        effect.duration = 1;
      } else {
      effect.duration = event.target.value;
      setEffects([...effects])
      }
    }
  }

  const handleRemoveEffect = (effect) => {
    return () => {
      effect.isActiveEffect = false;
      setEffects([...effects])
    }
  }

  const handleSetSelectedBuyItem1 = (event) => {
    const selectedItem = itemList.filter((item) => item.value === event.target.value)[0]

    if (event.target.value === 'none') {
      setSelectedBuyItem1({});
      setBuyItem1Count(1);
    } else {
      setSelectedBuyItem1(
        {
          label: selectedItem.label,
          value: selectedItem.value,
          image: selectedItem.image,
          count: selectedBuyItem1.count,
          stackSize: selectedItem.stackSize,
        }
      );
      setBuyItem1Count(1);
    }
  };

  const handleClearBuyItem1 = () => {
    setSelectedBuyItem1(
      {
        "name": "- Select -",
        "namespacedId": "none",
        "image": "",
        "item": "- Select -"
      },
    );
    setEffects([...effects])
    setBuyItem1Count(1);
  }

  const handleSetBuyItem1Count = (selectedBuyItem1) => {
    return (event) => {
      console.log('event.target', event.target);
      if (event.target.value > selectedBuyItem1.stackSize) {
      setBuyItem1Count(selectedBuyItem1.count = selectedBuyItem1.stackSize)
      } else if (event.target.value < 1) {
        setBuyItem1Count(selectedBuyItem1.count = 1)
      } else {
      setBuyItem1Count(selectedBuyItem1.count = event.target.value)
      }
    }
  }

  const handleSetSelectedBuyItem2 = (event) => {
    const selectedItem = itemList.filter((item) => item.value === event.target.value)[0]

    if (event.target.value === 'none') {
      setSelectedBuyItem2({});
      setBuyItem2Count(1);
    } else {
      setSelectedBuyItem2(
        {
          label: selectedItem.label,
          value: selectedItem.value,
          image: selectedItem.image,
          count: selectedBuyItem2.count,
          stackSize: selectedItem.stackSize,
        }
      );
      setBuyItem2Count(1);
    }
  };

  const handleClearBuyItem2 = () => {
    setSelectedBuyItem2({});
  }

  const handleSetBuyItem2Count = (selectedBuyItem2) => {
    return (event) => {
      console.log('event.target', event.target);
      if (event.target.value > selectedBuyItem2.stackSize) {
      setBuyItem2Count(selectedBuyItem2.count = selectedBuyItem2.stackSize)
      } else if (event.target.value < 1) {
        setBuyItem2Count(selectedBuyItem2.count = 1)
      } else {
      setBuyItem2Count(selectedBuyItem2.count = event.target.value)
      }
    }
    }

    const handleSetSelectedSellItem1 = (event) => {
      const selectedItem = itemList.filter((item) => item.value === event.target.value)[0]

      if (event.target.value === 'none') {
        setSelectedSellItem1({});
        setSellItem1Count(1);
      } else {
        setSelectedSellItem1(
          {
            label: selectedItem.label,
            value: selectedItem.value,
            image: selectedItem.image,
            count: selectedSellItem1.count,
            stackSize: selectedItem.stackSize,
          }
        );
        setSellItem1Count(1);
      }
      };

    const handleClearSellItem1 = () => {
      setSelectedSellItem1({});

    }

    const handleSetSellItem1Count = (selectedSellItem1) => {
      return (event) => {
        console.log('event.target', event.target);
        if (event.target.value > selectedSellItem1.stackSize) {
        setSellItem1Count(selectedSellItem1.count = selectedSellItem1.stackSize)
        } else if (event.target.value < 1) {
          setSellItem1Count(selectedSellItem1.count = 1)
        } else {
          setSellItem1Count(selectedSellItem1.count = event.target.value)
        }
      }
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
    : `Rotation:[${xRot}f,${yRot}f]`

    const villagerData =
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

    const activeEffects =
        `,ActiveEffects:[${effects.map((effect) => {
          if (effect.isActiveEffect === true) {
            return `{Id: ${effect.id},Amplifier:${effect.amplifier},Duration:${effect.duration}}`
          } else {
            return '';
          }
        })}
        ]`

    // TODO: fix comma situation
    setOutputCommand(
      ('/summon villager ' + position
      + ' {'
      + villagerData
      + villagerOptions
      + activeEffects
      + '}').replace(regex, '').replace(removeComma, '[{').replace(replaceComma, 'f,-')
      )
  }

  return (
    <div className='App'>
      {/* {console.log('itemList:', itemList)} */}
      {console.log('effects : ', effects)}
      {/* {console.log('raweffects : ', rawEffects)} */}
      {/* {console.log('activeeffects : ', activeEffects)} */}
      {/* {console.log('villager name:', villagerName)}
      {console.log('profession:', selectedProfession)}
      {console.log('workstation:', `./images/workstations/${workstations[selectedProfession]}`)}
      {console.log('level:', selectedLevel)}
      {console.log('biome:', selectedType)} */}
      {console.log('selectedBuyItem1', selectedBuyItem1)}
      {console.log('selectedBuyItem2', selectedBuyItem2)}
      {console.log('selectedSellItem1', selectedSellItem1)}
      {/* {console.log('invulnerability: ', invulnerability)}
      {console.log('persistence: ', persistence)}
      {console.log('silent: ', silent)}
      {console.log('noAi: ', noAi)}
      {console.log('isRelative: ', isRelative)}
      {console.log('xPos: ', xPos)}
      {console.log('yPos: ', yPos)}
      {console.log('zPos: ', zPos)}
      {console.log('xRot: ', xRot)}
      {console.log('yRot: ', yRot)} */}
      {/* {console.log('selectedEffects : ', selectedEffects)} */}
      {console.log('======================================================')}

      <form action=''>
        <h1 className='title'>Villager Trade Generator</h1>
        <hr className='divider' />
        <div className='mob-options'>
          <h3 className='panel-title'>Villager Type</h3>
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
            <label htmlFor='biome'>Biome</label>
            <select name='biome'
              id='biomes'
              value={selectedType}
              onChange={handleInputChange(setSelectedType)}>
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
              onChange={handleInputChange(setSelectedProfession)}>
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
              onChange={handleInputChange(setSelectedLevel)}>
                {levels.map((level) => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                  ))}
            </select>
          </div>
          <div className='villager-image-container'>
            {(selectedProfession !== 'unemployed') && (selectedProfession !== 'nitwit') && (
              <img className='workstation-image'
              src={require(`./images/workstations/${workstations[selectedProfession]}`)}
              alt={`${selectedType} ${selectedProfession}`} />
            )}

            <img className='villager-image'
              src={require(`./images/villagers/${selectedType}/${selectedProfession}.png`)}
              alt={`${selectedType} ${selectedProfession}`} />

            {(selectedProfession !== 'unemployed') && (selectedProfession !== 'nitwit') && (selectedLevel !== '99') && (
              <img className='badge-image'
              src={require(`./images/badges/${selectedLevel}.png`)}
              alt={`${selectedLevel}`} />
            )}
          </div>
        </div>

        {/* VILLAGER EFFECTS - checkboxes */}
        <hr className='divider' />
        <h3 className='panel-title'>Villager Effects</h3>

        <div className='options-panel'>
          <div></div>
          <div className='options'>
            <div>
              <Checkbox
                className='invulnerability'
                value={invulnerability}
                onChange={handleSetInvulnerability(setInvulnerability)}
                >click it</Checkbox>
              <label htmlFor='invulnerability'>Invulnerable</label>
            </div>
            <div>
              <Checkbox
                className='persistence'
                value={persistence}
                onChange={handleSetPersistence(setPersistence)}
                >click it</Checkbox>
              <label htmlFor='persistence'>Persistent</label>
            </div>
          </div>
          <div className='options'>
            <div>
              <Checkbox
                className='silent'
                value={silent}
                onChange={handleSetSilent(setSilent)}
                >click it</Checkbox>
              <label htmlFor='silent'>Silent</label>
            </div>
            <div>
              <Checkbox
                className='noAi'
                value={noAi}
                onChange={handleSetNoAi(setNoAi)}
                >click it</Checkbox>
              <label htmlFor='silent'>NoAI</label>
            </div>
          </div>
        </div>

        {/* VILLAGER EFFECTS - dropdown */}
        <div>
          <div>
            <label htmlFor='effects'>Effects</label>
          </div>
          <div>
            <select
              className='effects-selector'
              name='effects'
              id='effects'
              multiple={true}
              value={effects}
              onChange={handleAddEffect}>
                {effects.map((effect) => (
                  effect.isActiveEffect === true || effect.namespacedId === 'none'
                  ? <option key={effect.namespacedId} value={effect.namespacedId} disabled >&#10004; {effect.name}</option>
                  : <option key={effect.namespacedId} value={effect.namespacedId}>{effect.name}</option>
                  ))}
            </select>
          </div>
        </div>
        <div>
          {effects.map((effect) => (
            effect.isActiveEffect === true
            ? <div key={effect.name}>
                <div>
                  <label >{effect.name}</label>
                </div>
                <img className='effect-image'
                  src={require(`./images/effects/${effect.namespacedId}.png`)}
                  alt={`${selectedType} ${selectedProfession}`} />
                <div >
                  <label htmlFor='amplifier'>Amplifier:</label>
                  <input
                    className='selector-number'
                    name='amplifier'
                    type='number'
                    placeholder={effect.amplifier}
                    value={effect.amplifier}
                    onChange={handleAmplifierChange(effect)}
                    />
                  {(effect.amplifier === "255") && (
                    ' (max=255)'
                    )}
                  {(effect.amplifier === "0") && (
                    ' (min=0)'
                  )}
                </div>
                <div>
                  <label htmlFor='duration'>Duration:</label>
                  <input
                    className='selector-number'
                    name='duration'
                    type='number'
                    placeholder={effect.duration}
                    value={effect.duration}
                    onChange={handleDurationChange(effect)}
                    />
                  {(effect.duration === "1000000") && (
                    ' (max=1000000)'
                    )}
                  {(effect.duration === "1") && (
                    ' (min=1)'
                  )}

                </div>
                <button onClick={handleRemoveEffect(effect)}>Remove</button>
              </div>
            : <p key={effect.id}></p>
          ))}
        </div>
        <hr className='divider' />

        {/* POSITIONING */}
        <h3 className='panel-title'>Villager Position</h3>
        <div className='position-panel'>
          <div></div>
          <div >
            <div>
              <div>
                <label htmlFor='relative'>Position</label>
              </div>
              <select name='relative'
                value={isRelative}
                onChange={handleSetIsRelative(setIsRelative)}>
                  <option value={true}>Relative</option>
                  <option value={false}>Absolute</option>
              </select>
            </div>
            <div>
              <label htmlFor='xpos'>X:</label>
              <input
                className='selector-number'
                name='xpos'
                type='number'
                placeholder='0'
                value={xPos}
                onChange={handleInputChange(setXPos)}
                />
            </div>
            <div>
              <label htmlFor='ypos'>Y:</label>
              <input
                className='selector-number'
                name='ypos'
                type='number'
                placeholder='0'
                value={yPos}
                onChange={handleInputChange(setYPos)}
                />
            </div>
            <div>
              <label htmlFor='zpos'>Z:</label>
              <input
                className='selector-number'
                name='zpos'
                type='number'
                placeholder='0'
                value={zPos}
                onChange={handleInputChange(setZPos)}
                />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor='xRot'>Rotation</label>
            </div>
            <div>
              <label htmlFor='xRot'>x (body):</label>
              <input
                className='selector-number'
                name='xrot'
                type='number'
                placeholder='0'
                value={xRot}
                onChange={handleInputChange(setXRot)}
                />
              </div>
            <div>
              <label htmlFor='yRot'>y (head):</label>
              <input
                className='selector-number'
                name='yrot'
                type='number'
                placeholder='0'
                value={yRot}
                onChange={handleInputChange(setYRot)}
                />
            </div>
            <label htmlFor='yRot'>head tilt: 0=ahead, -90=up, 90=down:</label>
          </div>
        </div>
        <hr className='divider' />

        {/* TRADES - BUY ITEM 1 */}
        <h3 className='panel-title'>Villager Trades</h3>
        <div className='buy-item-panel'>
          <div></div>
          <div>
            <div>
              <label htmlFor='buy-item-1'>Buy Item 1</label>
            </div>
            <select
              className='selector-text'
              name='buy-item-1'
              id='buy-item-1'
              value={selectedBuyItem1.name}
              onChange={handleSetSelectedBuyItem1}>
                {itemList.map((item) => (
                  <option key={item.label} value={item.value}>{item.label}</option>
                  ))}
            </select>
            {(selectedBuyItem1.label !== undefined) && (
              <div>
                  <div>
                    <label htmlFor='quanitity'>Quantity:</label>
                    <select
                      name='quantity'
                      className='select-menu'
                      onChange={handleSetBuyItem1Count(selectedBuyItem1)}
                      value={selectedBuyItem1.count}>
                        {stackSize64.map((num) => (
                          num <= selectedBuyItem1.stackSize
                          ? <option key={num} value={num}>{num}</option>
                          : ''
                        ))}
                      </select>
                  </div>
                <div className='inventory-slot'>
                  <img className='inventory-slot-image' src={require('./images/items/inventory_slot.png')} alt='inventory slot'/>
                  <img className='trade-item-image' src={selectedBuyItem1.image} alt={selectedBuyItem1.item} />
                </div>
              </div>
            )}
            {(selectedBuyItem1.value !== undefined) && (
              <button onClick={handleClearBuyItem1}>Clear</button>
            )}
          </div>

          {/* TRADES - BUY ITEM 2 */}
          <div>
            <div>
              <div>
                <label htmlFor='buy-item-2'>Buy Item 2 (Optional)</label>
              </div>
              <select
                className='selector-text'
                name='buy-item-2'
                id='buy-item-2'
                value={selectedBuyItem2.value}
                onChange={handleSetSelectedBuyItem2}>
                  {itemList.map((item) => (
                    <option key={item.label} value={item.value}>{item.label}</option>
                    ))}
              </select>
              {(selectedBuyItem2.label !== undefined) && (
                <div>
                  <div>
                    <label htmlFor='quanitity'>Quantity:</label>
                    <select
                      name='quantity'
                      className='select-menu'
                      onChange={handleSetBuyItem2Count(selectedBuyItem2)}
                      value={selectedBuyItem2.count}>
                        {stackSize64.map((num) => (
                          num <= selectedBuyItem2.stackSize
                          ? <option key={num} value={num}>{num}</option>
                          : ''
                        ))}
                      </select>
                  </div>
                  <div className='inventory-slot'>
                    <img className='inventory-slot-image' src={require('./images/items/inventory_slot.png')} alt='inventory slot'/>
                    <img className='trade-item-image' src={selectedBuyItem2.image} alt={selectedBuyItem2.item} />
                  </div>
                </div>
              )}
              {(selectedBuyItem2.value !== undefined) && (
              <button onClick={handleClearBuyItem2}>Clear</button>
              )}
            </div>
          </div>

          {/* TRADES - SELL ITEM 1 */}
          <div>
            <div>
              <div>
                <label htmlFor='sell-item-1'>Sell Item</label>
              </div>
              <select
                className='selector-text'
                name='sell-item-1'
                id='sell-item-1'
                value={selectedSellItem1.value}
                onChange={handleSetSelectedSellItem1}>
                  {itemList.map((item) => (
                    <option key={item.label} value={item.value}>{item.label}</option>
                    ))}
              </select>
              {(selectedSellItem1.label !== undefined) && (
                <div>
                  <div>
                    <label htmlFor='quanitity'>Quantity:</label>
                    <select
                      name='quantity'
                      className='select-menu'
                      onChange={handleSetSellItem1Count(selectedSellItem1)}
                      value={sellItem1Count.count}>
                        {stackSize64.map((num) => (
                          num <= selectedSellItem1.stackSize
                          ? <option key={num} value={num}>{num}</option>
                          : ''
                        ))}
                      </select>
                  </div>
                  <div className='inventory-slot'>
                    <img className='inventory-slot-image' src={require('./images/items/inventory_slot.png')} alt='inventory slot'/>
                    <img className='trade-item-image' src={selectedSellItem1.image} alt={selectedSellItem1.item} />
                  </div>
                  {/* <p>{selectedSellItem1.label}</p> */}
                </div>
              )}
              {(selectedSellItem1.value !== undefined) && (
              <button onClick={handleClearSellItem1}>Clear</button>
              )}
            </div>
          </div>
        </div>

        {(outputCommand !== '') && (
          <>
            <hr className='divider' />
            <p value={outputCommand}>{outputCommand}</p>
          </>
        )}
        <hr className='divider' />
          <button onClick={handleOnSubmit}>Generate Command</button>
          <button onClick={handleReset}>Reset</button>
      </form>
    </div>
  );
}
