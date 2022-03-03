import './App.css';
import {useState} from 'react';
import {Checkbox} from '@mui/material';
import biomes from './data/biomes'
import rawEffects from './data/effects'
import items from './data/items'
import levels from './data/levels'
import professions from './data/professions'
import workstations from './data/workstations'

const {
  handleInputChange,
  handleClearItem,
  handleSetItemCount,
  handleSetSelectedItem
} = require('./helpers/hooks-helper');
const {handleSetInvulnerability, handleSetIsRelative, handleSetPersistence, handleSetSilent, handleSetNoAi} = require('./helpers/villager-properties-helper');
const _ = require('lodash');

export default function App() {
  const [customName, setCustomName] = useState('');
  const [invulnerability, setInvulnerability] = useState(false);
  const [isRelative, setIsRelative] = useState('true');
  const [noAi, setNoAi] = useState(false);
  const [persistence, setPersistence] = useState(false);
  const [selectedBuyItem1, setSelectedBuyItem1] = useState({});
  const [selectedBuyItem2, setSelectedBuyItem2] = useState({});
  const [selectedSellItem, setSelectedSellItem] = useState({});
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
  const [sellItemCount, setSellItemCount] = useState(1);
  const [outputCommand, setOutputCommand] = useState('');

// TODO: finish setting up Offer recipes array/formatting
  const [recipes, setRecipes] = useState([
    {
      buy:{
        id: selectedBuyItem1,
        Count: buyItem1Count
      },
      buyB:{
        id: selectedBuyItem2,
        Count: buyItem2Count
      },
      sell:{
        id: selectedSellItem,
        Count: sellItemCount
      },
      rewardExp:'0b',
      maxUses: 9999999
    }
  ]);
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

  const stackSize64 = _.range(1, 64)

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

//          Set Output Command & Reset
// \/===========================================\/
  const handleReset = (event) => {
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

    // TODO: finish setting up Offer recipes array/formatting
    const offers =
        `,Offers:{Recipes:${recipes.map((trade) => {
          return trade
        })}}`

    // TODO: fix comma situation
    setOutputCommand(
      ('/summon villager ' + position
      + ' {'
      + villagerData
      + villagerOptions
      + activeEffects
      + offers
      + '}').replace(regex, '').replace(removeComma, '[{').replace(replaceComma, 'f,-')
      )
  }

  return (
    <div className='App'>
      {console.log('effects : ', effects)}
      {console.log('selectedBuyItem1', selectedBuyItem1)}
      {console.log('selectedBuyItem2', selectedBuyItem2)}
      {console.log('selectedSellItem', selectedSellItem)}
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

        {/* VILLAGER OPTIONS - checkboxes */}
        <hr className='divider' />
        <h3 className='panel-title'>Villager Options</h3>
        <div className='options-panel'>
          <div></div>
          <div className='options'>
            <Checkbox
              className='invulnerability'
              value={invulnerability}
              onChange={handleSetInvulnerability(setInvulnerability)}
              >click it</Checkbox>
            <label htmlFor='invulnerability'>Invulnerable</label>
          </div>
          <div className='options'>
            <Checkbox
              className='persistence'
              value={persistence}
              onChange={handleSetPersistence(setPersistence)}
              >click it</Checkbox>
            <label htmlFor='persistence'>Persistent</label>
          </div>
          <div className='options'>
            <Checkbox
              className='silent'
              value={silent}
              onChange={handleSetSilent(setSilent)}
              >click it</Checkbox>
            <label htmlFor='silent'>Silent</label>
          </div>
          <div className='options'>
            <Checkbox
              className='noAi'
              value={noAi}
              onChange={handleSetNoAi(setNoAi)}
              >click it</Checkbox>
            <label htmlFor='silent'>NoAI</label>
          </div>
        </div>

        {/* VILLAGER EFFECTS - dropdown */}
        <hr className='divider' />
        <h3 className='panel-title'>Villager Effects</h3>
        <div>
          {/* <div>
            <label htmlFor='effects'>Effects</label>
          </div> */}
          <div className='effects-selector'>
            <select
              className='effects-selector-menu'
              name='effects'
              value='- Select Multiple Effects-'
              multiple={false}
              onChange={handleAddEffect}>
                {effects.map((effect) => (
                  effect.isActiveEffect === true || effect.namespacedId === 'none'
                  ? <option className='effects-selector-menu-item' key={effect.namespacedId} value={effect.namespacedId} disabled >&#10004; {effect.name}</option>
                  : <option className='effects-selector-menu-item' key={effect.namespacedId} value={effect.namespacedId}>{effect.name}</option>
                  ))}
            </select>
          </div>
        </div>
          <div className='active-effects-panel'>
            {effects.map((effect) => (
              effect.isActiveEffect === true
              ? <div className='active-effect' key={effect.name}>
                  <img className='effect-image'
                    src={require(`./images/effects/${effect.namespacedId}.png`)}
                    alt={`${selectedType} ${selectedProfession}`} />
                  <div>
                    <label >{effect.name}</label>
                  </div>
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
              : ''
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
              onChange={handleSetSelectedItem(itemList, selectedBuyItem1, setSelectedBuyItem1, setBuyItem1Count)}>
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
                      onChange={handleSetItemCount(selectedBuyItem1, setBuyItem1Count)}
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
              <button onClick={handleClearItem(setSelectedBuyItem1, setBuyItem1Count)}>Clear</button>
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
                value={selectedBuyItem2.name}
                onChange={handleSetSelectedItem(itemList, selectedBuyItem2, setSelectedBuyItem2, setBuyItem2Count)}>
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
                      onChange={handleSetItemCount(selectedBuyItem2, setBuyItem2Count)}
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
              <button onClick={handleClearItem(setSelectedBuyItem2, setBuyItem2Count)}>Clear</button>
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
                value={selectedSellItem.name}
                onChange={handleSetSelectedItem(itemList, selectedSellItem, setSelectedSellItem, setSellItemCount)}>
                  {itemList.map((item) => (
                    <option key={item.label} value={item.value}>{item.label}</option>
                    ))}
              </select>
              {(selectedSellItem.label !== undefined) && (
                <div>
                  <div>
                    <label htmlFor='quanitity'>Quantity:</label>
                    <select
                      name='quantity'
                      className='select-menu'
                      onChange={handleSetItemCount(selectedSellItem, setSellItemCount)}
                      value={sellItemCount.count}>
                        {stackSize64.map((num) => (
                          num <= selectedSellItem.stackSize
                          ? <option key={num} value={num}>{num}</option>
                          : ''
                        ))}
                      </select>
                  </div>
                  <div className='inventory-slot'>
                    <img className='inventory-slot-image' src={require('./images/items/inventory_slot.png')} alt='inventory slot'/>
                    <img className='trade-item-image' src={selectedSellItem.image} alt={selectedSellItem.item} />
                  </div>
                  {/* <p>{selectedSellItem.label}</p> */}
                </div>
              )}
              {(selectedSellItem.value !== undefined) && (
              <button onClick={handleClearItem(setSelectedSellItem, setSellItemCount)}>Clear</button>
              )}
            </div>
          </div>
        </div>

        <div className='generate-command-panel'>
        {(outputCommand !== '') && (
          <>
            <hr className='divider' />
            <p className='command-text' value={outputCommand}>{outputCommand}</p>
          </>
        )}
        <hr className='divider' />
          <button className='generate-command-button' onClick={handleOnSubmit}>Generate Command</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
}
