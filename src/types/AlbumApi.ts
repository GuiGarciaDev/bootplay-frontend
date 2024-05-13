export type GetMyCollectionResponse = MyAlbumModel[]

export type PostSaleAlbumResponse = MyAlbumModel

export interface PostSaleAlbumRequest {
  name: string
  idSpotify: string
  artistName: string
  imageUrl: string
  value: number
}

export interface MyAlbumModel {
  id: number
  name: string
  idSpotify: string
  artistName: string
  imageUrl: string
  value: number
  users: Users
}

export interface Users {
  id: number
  email: string
  password: string
}
