import logo from './logo.svg';
import './App.css';
import Customer from './components/Customer';
import { Table, TableBody, TableHead, TableCell, TableRow, withStyles, Paper } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  }
})

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

function App(props) {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
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
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(App);
