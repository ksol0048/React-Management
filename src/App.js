import logo from './logo.svg';
import './App.css';
import Customer from './components/Customer';

const randomNumber1 = Math.floor(Math.random() * 10) + 1; //랜덤 숫자
const randomNumber2 = Math.floor(Math.random() * 10) + 1; //랜덤 숫자
const randomNumber3 = Math.floor(Math.random() * 10) + 1; //랜덤 숫자
const customers = [
  {
    'id': 1,
    'image': `https://picsum.photos/id/${randomNumber1}/200/150`,
    'name': '홍길동',
    'birthday': '45677',
    'gender': '남자',
    'job': '대학생'
  },
  {
    'id': 2,
    'image': `https://picsum.photos/id/${randomNumber2}/200/150`,
    'name': '이순신',
    'birthday': '9612312',
    'gender': '여자',
    'job': '검사'
  },
  {
    'id': 3,
    'image': `https://picsum.photos/id/${randomNumber3}/200/150`,
    'name': '나동현',
    'birthday': '123456',
    'gender': '중성',
    'job': '마법사'
  }
];

function App() {
  return (
    <div>
      {
        customers.map(c => {
          return (
            <Customer
              key={c.id}
              id={c.id}
              image={c.image}
              name={c.name}
              birthday={c.birthday}
              gender={c.gender}
              job={c.job}
            />
          )
        })
      }
    </div>
  );
}

export default App;
