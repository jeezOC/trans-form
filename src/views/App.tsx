import { useState } from "react";
import TextEditor from "../components/TextEditor";

const App = () => {

  const [descriptions, setDescriptions] = useState(``);
  const [initialValues, setInitialValues] = useState(``);
  const [merge, setMerge] = useState(``);

  const handleMerge = () => {
    const descriptionsObj = JSON.parse(descriptions);
    const initialValuesObj = JSON.parse(initialValues);

    console.log(descriptionsObj);
    console.log(initialValuesObj);

    const combinedData: any = createInputs(descriptionsObj, initialValuesObj);
    setMerge(JSON.stringify(combinedData, null, 2));
  }




  return (
    <div className="flex min-h-[100dvh] max-h-full  justify-end h-[100dvh] "> {/* Use min-h-screen for full-screen height */}
      <div className="flex-1 flex-grow max-h-full bg-black text-white flex flex-col overflow-auto p-4 gap-4"> {/* Add h-full and flex class */}
        <h1 className="text-4xl font-bold text-center">Trans Form</h1>
        <div className="w-full flex flex-1 flex-row gap-4 ">
          <div className=" flex flex-col w-full gap-4 ">
            <h2 className="text-3xl text-center ">Descriptions</h2>
            <TextEditor code={descriptions} setCode={setDescriptions} />
          </div>
          <div className=" flex flex-col w-full gap-4 ">
            <h2 className="text-3xl text-center ">Initial values</h2>
            <TextEditor code={initialValues} setCode={setInitialValues} />
          </div>
        </div>
        <div className="w-full flex flex-1 flex-row  ">
          {
            merge
              ? (
                <>
                  <div className=" flex flex-col w-full gap-4 ">
                    <h2 className="text-3xl text-center ">Merge</h2>
                    <TextEditor code={merge} readonly />
                    <div className=" flex flex-row w-full gap-4 ">
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
                        onClick={() => setMerge('')}
                      >Reset</button>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                        onClick={() => navigator.clipboard.writeText(merge)}
                      >Copy</button>
                    </div>
                  </div>

                </>
              ) : (
                <div className=" flex flex-col w-full gap-4 ">

                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleMerge}>Merge</button>
                </div>
              )
          }
        </div>
      </div>
    </div>
  );

}


const createInputs = (descriptionsObj: any, valuesObj: any, parentKey?: string) => {
  return Object.keys(descriptionsObj).reduce((accumulator: any, itemKey: any) => {
    const isObject = typeof descriptionsObj[itemKey] === 'object';
    const value = valuesObj[itemKey];
    const description = isObject ? `AGREGAR LABEL PARA ${itemKey}` : descriptionsObj[itemKey];

    if (parentKey) {
      if (!accumulator?.[`${parentKey}`]) {
        accumulator[`${parentKey}`] = {};
      }
    }
    else
    if (!accumulator[itemKey]) {
      accumulator[itemKey] = {
        
      };
    }
    if (isObject) {
      // Si es una subsección, inicializa el objeto en caso de que no exista
      // Recursivamente llama a createInputs para las subsecciones
      const subsection = createInputs(descriptionsObj[itemKey], value, parentKey);
      if (parentKey) {
        // Si hay un parentKey, agrega la subsección a las subsecciones del parentKey
        if (!accumulator?.[`${parentKey}`]?.['subsections']) {
          accumulator[`${parentKey}`]['subsections'] = {};
        }
        // const subsection = createInputs(descriptionsObj[itemKey], value, itemKey);
        // const newParentKey = `${parentKey}.subsections.${itemKey}`;
        accumulator[`${parentKey}`]['subsections'][`${itemKey}`] ={  label: description, ...subsection}
      } 
      else {
        // Si no hay parentKey, agrega la subsección como una sección principal
        // const subsection = createInputs(descriptionsObj[itemKey], value, itemKey);
        accumulator[itemKey] = { label: description, ...subsection}
      }
    }
    else {
      // Si no es un objeto, agrega un input simple
      if (parentKey) {
        if (!accumulator?.[`${parentKey}`]?.['inputs']) {
          accumulator[`${parentKey}`]['inputs'] = {};
        }
        accumulator[`${parentKey}`][`inputs`][`${itemKey}`] = {
          label: description,
          value,
        };
      } else {
        accumulator[itemKey] = {
          label: description,
          value,
        };
      }
    }

    return accumulator;
  }, {});
}





export default App;





