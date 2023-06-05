export interface GithubProfile {
  avatar_url: string;
  bio: string;
  blog: string;
  company: string;
  created_at: string;
  email?: any;
  events_url: string;
  followers_url: string;
  followers: number;
  following_url: string;
  following: number;
  gists_url: string;
  gravatar_id: string;
  hireable: boolean;
  html_url: string;
  id: number;
  location: string;
  login: string;
  name: string;
  node_id: string;
  organizations_url: string;
  public_gists: number;
  public_repos: number;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  twitter_username?: any;
  type: string;
  updated_at: string;
  url: string;
}

export interface GithubCommit {
  sha: string;
  node_id: string;
  commit: Commit;
  url: string;
  html_url: string;
  comments_url: string;
  author: Author2;
  committer: Author2;
  parents: Parent[];
}

interface Parent {
  sha: string;
  url: string;
  html_url: string;
}

interface Author2 {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

interface Commit {
  author: Author;
  committer: Author;
  message: string;
  tree: Tree;
  url: string;
  comment_count: number;
  verification: Verification;
}

interface Verification {
  verified: boolean;
  reason: string;
  signature?: any;
  payload?: any;
}

interface Tree {
  sha: string;
  url: string;
}

interface Author {
  name: string;
  email: string;
  date: string;
}

export interface URLMetadata {
  url: string;
  canonical: string;
  title: string;
  image: string;
  author: string;
  description: string;
  keywords: string;
  source: string;
  price: string;
  priceCurrency: string;
  availability: string;
  robots: string;
  'og:url': string;
  'og:locale': string;
  'og:locale:alternate': string;
  'og:title': string;
  'og:type': string;
  'og:description': string;
  'og:determiner': string;
  'og:site_name': string;
  'og:image': string;
  'og:image:secure_url': string;
  'og:image:type': string;
  'og:image:width': string;
  'og:image:height': string;
  'twitter:title': string;
  'twitter:description': string;
  'twitter:image': string;
  'twitter:image:alt': string;
  'twitter:card': string;
  'twitter:site': string;
  'twitter:site:id': string;
  'twitter:url': string;
  'twitter:account_id': string;
  'twitter:creator': string;
  'twitter:creator:id': string;
  'twitter:player': string;
  'twitter:player:width': string;
  'twitter:player:height': string;
  'twitter:player:stream': string;
  'twitter:app:name:iphone': string;
  'twitter:app:id:iphone': string;
  'twitter:app:url:iphone': string;
  'twitter:app:name:ipad': string;
  'twitter:app:id:ipad': string;
  'twitter:app:url:ipad': string;
  'twitter:app:name:googleplay': string;
  'twitter:app:id:googleplay': string;
  'twitter:app:url:googleplay': string;
  responseBody: string;
  'optimizely-datafile': string;
  'route-pattern': string;
  'current-catalog-service-hash': string;
  'request-id': string;
  'html-safe-nonce': string;
  'visitor-payload': string;
  'visitor-hmac': string;
  'hovercard-subject-tag': string;
  'github-keyboard-shortcuts': string;
  'google-site-verification': string;
  'octolytics-url': string;
  'analytics-location': string;
  viewport: string;
  'fb:app_id': string;
  'apple-itunes-app': string;
  'twitter:image:src': string;
  'og:image:alt': string;
  hostname: string;
  'expected-hostname': string;
  'enabled-features': string;
  'turbo-cache-control': string;
  'go-import': string;
  'octolytics-dimension-user_id': string;
  'octolytics-dimension-user_login': string;
  'octolytics-dimension-repository_id': string;
  'octolytics-dimension-repository_nwo': string;
  'octolytics-dimension-repository_public': string;
  'octolytics-dimension-repository_is_fork': string;
  'octolytics-dimension-repository_network_root_id': string;
  'octolytics-dimension-repository_network_root_nwo': string;
  'turbo-body-classes': string;
  'browser-stats-url': string;
  'browser-errors-url': string;
  'browser-optimizely-client-errors-url': string;
  'theme-color': string;
  'color-scheme': string;
}

export interface KnowledgeGroup {
  created_at: string;
  description: string;
  id: number;
  image: string;
  KnowledgeGroupUsers: KnowledgeGroupUser[];
  name: string;
  owner: string;
  private: boolean;
  slug: string;
}

export interface KnowledgeBase {
  created_at: string;
  description: string;
  icon: any;
  id: number;
  image: string;
  knowledge_group_id: number;
  owner: Profiles;
  slug: string;
  tags: any;
  url: string;
}

export interface KnowledgeGroupUser {
  id: number;
  user_id: string;
  role: string;
  knowledge_group_id: number;
  created_at: string;
  Profiles: Profiles;
}

export interface Profiles {
  id: string;
  login: string;
  photo: string;
  name: string;
}
