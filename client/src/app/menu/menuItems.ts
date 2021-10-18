const menu: MenuItem[] = [
  {
    id: 1, 
    text: 'Home',
    path: ''
  },
  {
    id: 2,
    text: 'Quiz generator',
    path: '/quizGenerator'
  },
  {
    id: 3, 
    text: 'Organize',
    path: '/categories'
  },
]

export interface MenuItem {
  id: number;
  text: string;
  path: string;
}

export { menu };