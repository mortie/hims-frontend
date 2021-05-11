import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Collapse } from 'antd';
import { Select } from 'antd';


const { Panel } = Collapse;
const { Option } = Select;


const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;




const ControlledAccordions = (props) => {
  
  const itemList = props.historyfields.map((item, index) => (
      <Panel header={item.display} key={index}>
      {item.answers.length == 0 && <p>{item.display}</p>}
      {item.answers.length > 0 && <ControlledAccordions historyfields={item.answers} />}
    </Panel>    
  ));

  return(
    <Collapse accordion>
      {itemList}
  </Collapse>)
}

export default ControlledAccordions;