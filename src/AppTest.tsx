import {useEffect, useState} from 'react';
import RadioButtonGroupField from './components/form/RadioButtonGroupField';
import { useLocation } from 'react-router-dom';

const App = () => {

  const [value, setValue] = useState("")

  const options = [
    {
      label: "Salom",
      value: "salom",
    },
    {
      label: "Salom 2",
      value: "salom_2"
    },
    {
      label: "Salom 3",
      value: "salom_3"
    }
  ]

  return (
   <RadioButtonGroupField
        options={options}
        onChange={(value: any)=>setValue(value.target.value)}
        value={value}
    />
  );
};

export default App;