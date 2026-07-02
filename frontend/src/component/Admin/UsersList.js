import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";
import { useNavigate } from "react-router-dom";
import { createConversation } from "../../actions/conversationAction";
import ChatIcon from "@mui/icons-material/Chat";
import { CREATE_CONVERSATION_RESET } from "../../constants/conversationConstants";

const UsersList = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();

  const alert = useAlert();

  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);
  const { conversation } = useSelector(
      (state) => state.conversation
  );

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const chatHandler = (userId) => {

    dispatch(createConversation(userId));

};

  useEffect(() => {

    if (conversation && conversation._id) {

        navigate(`/chat/${conversation._id}`);

    }

}, [conversation, navigate]);
    useEffect(() => {

          if (conversation?._id) {

            navigate(`/chat/${conversation._id}`);

            dispatch({
                type: CREATE_CONVERSATION_RESET,
            });

        }

        }, [conversation?._id, navigate, dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.row.role === "admin"
          ? "greenColor"
          : "redColor";
      },
    },
    {
    field: "chat",
    headerName: "Chat",
    minWidth: 100,
    flex: 0.2,
    sortable: false,

    renderCell: (params) => {

        if (params.row.role === "admin") {
            return null;
        }

        return (

            <Button
                onClick={() => chatHandler(params.row.id)}
            >
                <ChatIcon style={{ color: "tomato" }} />
            </Button>

        );

    },
},

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.row.id}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.row.id)
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;