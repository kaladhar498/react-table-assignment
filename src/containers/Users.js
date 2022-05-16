import * as React from "react";
import { connect } from "react-redux";
import ProgressBar from "../components/progressbar";
import { loadUsers } from "../redux/actions";
import "./style.css";

class UsersWithReduxSaga extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: this.props.data,
      inputText: "",
      filteredData: [],
      start: 0,
      end: 10,
      limit: 10,
      pages: 1,
    };
    this.sortByAsc = this.sortByAsc.bind(this);
    this.sortByDesc = this.sortByDesc.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  async componentDidMount() {
    const { loadUsers } = this.props;
    await loadUsers(this.state.start, this.state.end);
    if (this.props.data.length > 0) {
      this.setState({ users: this.props.data });
      console.log(this.state.users);
    }
    this.setState({
      start: this.state.end,
      end: this.state.end + this.state.limit,
      pages: this.state.pages + 1,
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      users: props.data,
    });
  }

  sortByAsc = () => {
    let users = this.state.users.sort((a, b) =>
      a.full_name.localeCompare(b.full_name)
    );
    this.setState({ users: users });
  };

  sortByDesc = () => {
    let sortedDescending = this.state.users.sort((a, b) =>
      b.full_name.localeCompare(a.full_name)
    );
    this.setState({
      users: sortedDescending,
    });
  };

  inputHandler = (input) => {
    var inputText = input.target.value.toLowerCase();
    this.setState({
      inputText: inputText,
    });
    const filteredData = this.state.users.filter((el) => {
      if (inputText === "") {
        return el;
      } else {
        return el.full_name.toLowerCase().includes(inputText);
      }
    });
    this.setState({
      filteredData: filteredData,
    });
  };

  goToNextPage = () => {
    this.setState({
      users: [],
    });
    this.setState({
      start: this.state.end,
      end: this.state.end + this.state.limit,
      pages: this.state.pages + 1,
    });
    this.loadMore();
  };

  loadMore = () => {
    const { loadUsers } = this.props;
    loadUsers(this.state.start, this.state.end);
  };

  render() {
    if (this.props.loading) {
      return <div>Loading</div>;
    }

    if (this.props.error) {
      return <div style={{ color: "red" }}>ERROR: {this.props.error}</div>;
    }

    return (
      <>
        <div style={{ display: "flex", "justify-content": "center" }}>
          <input placeholder="Enter Employee Name" onChange={this.inputHandler} />
        </div>
        <div className="style">
          <table>
            <caption style={{ align: "right" }}>Employees List</caption>
            <thead>
              <tr>
                <th>S.NO</th>
                <th>
                  <button type="button" onClick={this.sortByAsc}>
                  Full Name Asc
                  </button>
                  <button type="button" onClick={this.sortByDesc}>
                    {" "}
                    Full Name desc
                  </button>
                </th>
                <th>Desgination</th>
                <th>Salary</th>
                <th>Salary in %</th>
              </tr>
            </thead>
            <tbody>
              {this.state.inputText === ""
                ? this.state.users.length > 0 &&
                  this.state.users.map((u, i) => (
                    <tr key={i}>
                       <td>{u.id}</td>
                      <td>{u.full_name}</td>
                      <td>{u.job}</td>
                      <td>{u.salary}</td>
                      <td><ProgressBar bgcolor={"#6a1b9a"} completed={Math.round(u.salary.substring(1) / 100) }/></td>
                    </tr>
                  ))
                : this.state.filteredData.map((u, i) => (
                    <tr key={i}>
                       <td>{u.id}</td>
                      <td>{u.full_name}</td>
                      <td>{u.job}</td>
                      <td>{u.salary}</td>
                      <td><ProgressBar bgcolor={"#6a1b9a"} completed={Math.round(u.salary.substring(1) / 100) }/></td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: "flex", "justify-content": "center" }}>
          <button onClick={this.goToNextPage}>next</button>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.reduxSaga.data,
  loading: state.reduxSaga.loading,
  error: state.reduxSaga.error,
});

const mapDispatchToProps = {
  loadUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersWithReduxSaga);
