export interface ITrack {
  artwork: Artwork
  description: string
  genre: string
  id: string
  track_cid: string
  preview_cid: null
  orig_file_cid: string
  orig_filename: string
  is_original_available: boolean
  mood: string
  release_date: string
  remix_of: RemixOf
  repost_count: number
  favorite_count: number
  comment_count: number
  tags: string
  title: string
  user: User
  duration: number
  is_downloadable: boolean
  play_count: number
  permalink: string
  is_streamable: boolean
  ddex_app: string
  playlists_containing_track: number[]
  pinned_comment_id: null
  album_backlink: null
}

export interface Artwork {
  "150x150": string
  "480x480": string
  "1000x1000": string
}

export interface RemixOf {
  tracks: null
}

export interface User {
  album_count: number
  artist_pick_track_id: null
  bio: string
  cover_photo: CoverPhoto
  followee_count: number
  follower_count: number
  handle: string
  id: string
  is_verified: boolean
  twitter_handle: null
  instagram_handle: null
  tiktok_handle: null
  verified_with_twitter: boolean
  verified_with_instagram: boolean
  verified_with_tiktok: boolean
  website: null
  donation: null
  location: string
  name: string
  playlist_count: number
  profile_picture: ProfilePicture
  repost_count: number
  track_count: number
  is_deactivated: boolean
  is_available: boolean
  erc_wallet: string
  spl_wallet: null
  spl_usdc_payout_wallet: null
  supporter_count: number
  supporting_count: number
  total_audio_balance: number
  wallet: string
}

export interface CoverPhoto {
  "640x": string
  "2000x": string
}

export interface ProfilePicture {
  "150x150": string
  "480x480": string
  "1000x1000": string
}
