export interface IBoard {
  id: number
  name: string // 名称
  description: string // 名称
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

// 新增、编辑Board
export interface ISaveBoardParams extends Pick<IBoard, 'name' | 'description'> {
  id?: number
  name: string,
  description: string
}

// 新增、编辑卡片组
export interface ISaveCardGroupParams extends Pick<ICardGroup, 'boardId' | 'name'> {
  id?: number
  boardId: number,
  name: string
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
