import { request } from '@/utils/request'
import { AxiosPromise } from 'axios'
import { IQueryOneBoardParams, IBoard, ISaveCardParams, ICard, IQueryBoardsParams, ISaveCardGroupParams, ISaveBoardParams } from './types'

/**
 * 获取一个项目的详细信息，带字表
 * @param {IQueryParams} params
 */
export function getOneBoard(params?: IQueryOneBoardParams): AxiosPromise<IBoard> {
  return request({
    method: 'POST',
    url: '/board/getOne',
    data: params
  })
}

export function getMyBoards(params?: IQueryBoardsParams): AxiosPromise<IBoard[]>{
  return request({
    method: 'GET',
    url: '/board/list',
    data: params
  })
}

export function addCard(params?: ISaveCardParams): AxiosPromise<ICard> {
  return request({
    method: 'POST',
    url: '/card',
    data: params
  })
}

export function editCard(params?: ISaveCardParams): AxiosPromise<ICard> {
  return request({
    method: 'PUT',
    url: '/card',
    data: params
  })
}

export function addBoard(params?: ISaveBoardParams): AxiosPromise<ICard> {
  return request({
    method: 'POST',
    url: '/board',
    data: params
  })
}

export function editBoard(params?: ISaveBoardParams): AxiosPromise<ICard> {
  return request({
    method: 'PUT',
    url: '/board',
    data: params
  })
}

export function addCardGroup(params?: ISaveCardGroupParams): AxiosPromise<ICard> {
  return request({
    method: 'POST',
    url: '/cardGroup',
    data: params
  })
}

export function editCardGroup(params?: ISaveCardGroupParams): AxiosPromise<ICard> {
  return request({
    method: 'PUT',
    url: '/cardGroup',
    data: params
  })
}



// /**
//  * 获取除某个部门以及其所有子孙部门的列表
//  * @param {number} id
//  */
// export const getDeptListExclude = (id: number): AxiosPromise<IDept[]> =>
//   request({
//     method: 'get',
//     url: `/department/list/exclude/${id}`
//   })

// /**
//  * 新增部门
//  * @param {ISaveDept} data
//  */
// export const addDept = (data: ISaveDept) =>
//   request({
//     method: 'post',
//     url: '/department',
//     data
//   })

// /**
//  * 编辑部门
//  * @param {ISaveDept} data
//  */
// export const editDept = (data: ISaveDept) =>
//   request({
//     method: 'put',
//     url: '/department',
//     data
//   })

// /**
//  * 删除部门
//  * @param {Number} id
//  */
// export const deleteDept = (id: number) =>
//   request({
//     method: 'delete',
//     url: `/department/${id}`
//   })
