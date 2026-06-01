export interface ITrack {
  track_id: number
  description: string
  genre: string
  id: string
  track_cid: string
  preview_cid: any
  orig_file_cid: string
  orig_filename: string
  is_original_available: boolean
  mood: string
  release_date: string
  repost_count: number
  favorite_count: number
  comment_count: number
  tags: string
  title: string
  slug: string
  duration: number
  is_downloadable: boolean
  play_count: number
  ddex_app: any
  pinned_comment_id: any
  playlists_containing_track: number[]
  playlists_previously_containing_track: PlaylistsPreviouslyContainingTrack
  album_backlink: any
  blocknumber: number
  create_date: any
  created_at: string
  cover_art_sizes: string
  credits_splits: any
  isrc: any
  license: string
  iswc: any
  field_visibility: FieldVisibility
  has_current_user_reposted: boolean
  has_current_user_saved: boolean
  is_scheduled_release: boolean
  is_unlisted: boolean
  stem_of: any
  track_segments: any[]
  updated_at: string
  is_delete: boolean
  cover_art: any
  is_available: boolean
  ai_attribution_user_id: any
  allowed_api_keys: any
  audio_upload_id: any
  preview_start_seconds: any
  bpm: number
  is_custom_bpm: boolean
  musical_key: string
  is_custom_musical_key: boolean
  audio_analysis_error_count: number
  comments_disabled: boolean
  ddex_release_ids: any
  artists: any
  resource_contributors: any
  indirect_resource_contributors: any
  rights_controller: any
  copyright_line: any
  producer_copyright_line: any
  parental_warning_type: any
  is_stream_gated: boolean
  is_download_gated: boolean
  cover_original_song_title: any
  cover_original_artist: any
  is_owned_by_user: boolean
  access_authorities: any
  permalink: string
  is_streamable: boolean
  artwork: Artwork
  stream: Stream
  download: any
  preview: any
  user_id: string
  user: User
  access: Access
  followee_reposts: any[]
  followee_favorites: any[]
  remix_of: RemixOf
  stream_conditions: any
  download_conditions: any
}

export interface PlaylistsPreviouslyContainingTrack {}

export interface FieldVisibility {
  mood: boolean
  tags: boolean
  genre: boolean
  share: boolean
  remixes: boolean
  play_count: boolean
}

export interface Artwork {
  "150x150": string
  "480x480": string
  "1000x1000": string
  mirrors: string[]
}

export interface Stream {
  url: string
  mirrors: string[]
}

export interface User {
  album_count: number
  allow_ai_attribution: boolean
  artist_coin_badge: any
  artist_pick_track_id: any
  associated_sol_wallets_balance: string
  associated_wallets_balance: string
  balance: string
  bio: string
  blocknumber: number
  coin_flair_mint: any
  cover_photo: CoverPhoto
  cover_photo_cids: any
  cover_photo_legacy: any
  cover_photo_sizes: string
  created_at: string
  creator_node_endpoint: string
  current_user_followee_follow_count: number
  does_current_user_follow: boolean
  does_current_user_subscribe: boolean
  does_follow_current_user: boolean
  donation: any
  erc_wallet: string
  followee_count: number
  follower_count: number
  handle: string
  handle_lc: string
  has_collectibles: boolean
  id: string
  instagram_handle: string
  is_available: boolean
  is_deactivated: boolean
  is_storage_v2: boolean
  is_verified: boolean
  location: string
  name: string
  payout_wallet: string
  playlist_count: number
  profile_picture: ProfilePicture
  profile_picture_cids: any
  profile_picture_legacy: any
  profile_picture_sizes: string
  profile_type: any
  repost_count: number
  spl_usdc_payout_wallet: any
  spl_usdc_wallet: string
  spl_wallet: string
  supporter_count: number
  supporting_count: number
  tiktok_handle: any
  total_audio_balance: number
  total_balance: string
  track_count: number
  twitter_handle: string
  updated_at: string
  user_id: number
  verified_with_instagram: boolean
  verified_with_tiktok: boolean
  verified_with_twitter: boolean
  wallet: string
  waudio_balance: string
  website: any
}

export interface CoverPhoto {
  "2000x": string
  "640x": string
  mirrors: string[]
}

export interface ProfilePicture {
  "1000x1000": string
  "150x150": string
  "480x480": string
  mirrors: string[]
}

export interface Access {
  stream: boolean
  download: boolean
}

export interface RemixOf {
  tracks: any[]
}
