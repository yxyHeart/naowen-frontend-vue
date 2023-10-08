import { request } from "@/utils/service"
import type * as Table from "./types/table"

/** 增 */
export function createTableDataApi(data: Table.CreateTableRequestData) {
  return request({
    url: "table",
    method: "post",
    data
  })
}

/** 删 */
export function deleteTableDataApi(id: string) {
  return request({
    url: `table/${id}`,
    method: "delete"
  })
}

/** 改 */
export function updateTableDataApi(data: Table.UpdateTableRequestData) {
  return request({
    url: "table",
    method: "put",
    data
  })
}

/** 查 */
export function getTableDataApi(params: Table.GetTableRequestData) {
  return request<Table.GetTableResponseData>({
    url: "table",
    method: "get",
    params
  })
}

/**
 * 以下是用indexedDB实现的
 */
//增
export function createTableDataApiV2(data: Table.CreateTableRequestData) {
  const {username,password,roles,phone,email} = data
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('mydb2', 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore('users', { keyPath: 'id',autoIncrement: true});
    };

    request.onsuccess = (event:Event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      addUser(db)
        .then(resolve)
        .catch(err => reject(err));
    };
    function addUser(db:IDBDatabase) {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction('users', 'readwrite');
        const store = transaction.objectStore('users');
        const getAllKeysRequest = store.getAllKeys()
        getAllKeysRequest.onsuccess = (event:Event)=>{
          const _maxId = Math.max(...((event.target as IDBRequest).result).map((key:unknown)=>Number(key as unknown as string)))
          store.add({
            createTime: new Date().toISOString(),
            email: email,
            id: _maxId + 1,
            phone: phone,
            roles: roles,
            status: true,
            username: username,
          });
          resolve("添加用户成功")
        }

        transaction.onerror = () => {
          reject(transaction.error); 
        }
      });
    }
  });
}

//查
export function getTableDataApiV2(params:Table.GetTableRequestData) {
  const { currentPage, size, username, phone} = params
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('mydb2', 1);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore('users', { keyPath: 'id',autoIncrement: true });
    };

    request.onsuccess = (event: Event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      queryUsers(db)
        .then((data) => resolve(data))
        .catch(err => reject(err));
    };

    function queryUsers(db:IDBDatabase):Promise<Table.GetTableResponseData> {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction('users');
        const store = transaction.objectStore('users');
        
        const _begin = (currentPage - 1) * size + 1
        const countRequest = store.count()
        countRequest.onsuccess=((event:Event)=>{
          const _count = (event.target as IDBRequest).result

          const getAllRequest = store.getAll(IDBKeyRange.lowerBound(_begin),size);
          
          
          getAllRequest.onsuccess = (event: Event) => {
            const userInfos = (event.target as IDBRequest).result
            const ret = {
              data:{
                list:userInfos.filter((info:Table.GetTableData)=>{
                  if((username==='' || username === undefined || username === null) 
                    && (phone ==='' || phone === undefined || phone === null)){
                    return true
                  }
                  if (phone ==='' || phone === undefined || phone === null){
                    return info.username === username
                  }else if(username==='' || username === undefined || username === null){
                    return info.phone === phone
                  }else{
                    return info.phone === phone && info.username === username
                  }
                 
                }),
                total:_count
              },
              code:0,
              message:"",
            }
            resolve(ret);
          };
          getAllRequest.onerror = (event:Event) => {
            reject((event.target as IDBRequest).error);
          };
        })

      });
    }
  });
}

// 删除
export function deleteTableDataApiV2(id: string){
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('mydb2', 1);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore('users', { keyPath: 'id',autoIncrement: true });
    };

    request.onsuccess = (event: Event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      deleteUsers(db)
        .then(data => resolve(data))
        .catch(err => reject(err));
    };

    function deleteUsers(db:IDBDatabase) {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction('users',"readwrite");
        const store = transaction.objectStore('users');
        
        const deleteRequest = store.delete(Number(id))

        deleteRequest.onsuccess = () =>{
          resolve("删除成功")
        }
        deleteRequest.onerror = (event:Event) => {
          reject((event.target as IDBRequest).error);
        };
      });
    }
  });
}

// 修改

export function updateTableDataApiV2(data: Table.UpdateTableRequestData){
  const {id,username,password,roles,phone,email} = data
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('mydb2', 1);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore('users', { keyPath: 'id',autoIncrement: true });
    };

    request.onsuccess = (event: Event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      updateUsers(db)
        .then(data => resolve(data))
        .catch(err => reject(err));
    };

    function updateUsers(db:IDBDatabase) {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction('users',"readwrite");
        const store = transaction.objectStore('users');
        
        const updateRequest = store.get(Number(id))

        updateRequest.onsuccess = (event:Event) =>{
          const item = (event.target as IDBRequest).result
          item.username = username
          item.roles = roles
          item.phone = phone
          item.email = email
          store.put(item)
          resolve("修改成功")
          
        }
        updateRequest.onerror = (event:Event) => {
          reject((event.target as IDBRequest).error);
        };
      });
    }
  });

}
