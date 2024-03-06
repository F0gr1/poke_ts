// promiseオブジェクト　成功時にresovel(then) 失敗時は(reject)
export const getAllPokemon = (url:string) =>{
  return new Promise((resolve , reject) => {
    fetch(url)
      .then((res => res.json()))
      .then((data) => resolve(data));
  });
}