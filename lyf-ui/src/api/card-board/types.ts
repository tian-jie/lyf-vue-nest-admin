export interface IBoard {
  id: number
  name: string // 名称
  owner: string 
  createTime: string // 创建时间
  updateTime: string // 编辑时间
  cardGroups?: ICardGroup[]

}

export interface ICardGroup{
  id: number
  name: string // 名称
  color: string
  boardId: number,
  createTime: string // 创建时间
  updateTime: string // 编辑时间
  cards?: ICard[]
}

export interface ICard{
  id: number
  content: string
  user: string
  cardGroupId: number,
  createTime: string // 创建时间
  updateTime: string // 编辑时间
}

// 新增、编辑卡片
export interface ISaveCardParams extends Pick<ICard, 'content' | 'cardGroupId'> {
  id?: number
  content: string,
  cardGroupId: number,
  user?: string
}

// 查询参数
export interface IQueryOneBoardParams {
  id: number
}


// 查询参数
export interface IQueryBoardsParams {
  name?: string // 名称
  owner: number
}
