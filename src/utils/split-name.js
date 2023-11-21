// Path: src/pages/api/split-name
export default function splitNames(names){
  let output = []
  if (Array.isArray(names)){
    output = names.map(splitSingleName);
  } else {
    output = [splitSingleName(names)];
  }

  return output.filter(Boolean)
}

function splitSingleName(name){
  if (name.length === 0) return;
  const nameArray = name.split(" ");
  const firstName = nameArray[0];
  const lastName = nameArray[nameArray.length - 1];
  const middleName =  nameArray.slice(1, nameArray.length - 1).join(" ");

  return {
    name,
    firstName,
    middleName,
    lastName,
  }
}