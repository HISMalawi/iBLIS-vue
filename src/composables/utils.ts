// imports goes here

const utils = () => {

  const CapitalizeFirstLetter = (string : string) => {

    const input = string;
    const output = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
    
    return output;
  }

  const CapitalizeAllFirstLetters = (string : string) => {

    const input = string.toLowerCase();
    const inputArry = input.split(" ");

    for (let index = 0; index < inputArry.length; index++) {
      inputArry[index] = inputArry[index].charAt(0).toUpperCase() + inputArry[index].slice(1);
      
    }

    const output = inputArry.join(" ");
    
    return output;
  }

  return { 
    CapitalizeFirstLetter,
    CapitalizeAllFirstLetters,
  };
};

export default utils;
