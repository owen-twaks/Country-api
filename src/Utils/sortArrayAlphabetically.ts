export function sortArrayAlphabetically(array:any[], property:string | undefined){
  if(property){
    return array.sort((a, b) => 
      a[property].toLowerCase().localeCompare(b[property].toLowerCase()));
  }
    
  return array.sort((a,b) => (a.toLowerCase().localeCompare(b.toLowerCase())));
}