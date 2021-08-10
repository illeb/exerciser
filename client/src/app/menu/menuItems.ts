const menu: MenuItem[] = [
  {
    id: 1, 
    text: 'Home',
    path: ''
  },
  {
    id: 1, 
    text: 'Quiz generator',
    path: 'quiz'
  },
  {
    id: 1, 
    text: 'Organize',
    path: 'organize'
  },
]

export interface MenuItem {
  id: number;
  text: string;
  path: string;
}

export { menu };