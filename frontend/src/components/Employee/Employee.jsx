import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import {
  clearErrors,
  deleteEmployee,
  getEmployee,
} from "../../action/employeeAction";
import CreateEmployee from "./CreateEmployee";
import { toast } from "react-toastify";
import { DELETE_EMPLOYEE_RESET } from "../../constants/employeeConstant";

const TABS = [];

const TABLE_HEAD = [
  "Unique Id ",
  "Name",
  "Email",
  "Mobile No",
  "Designation",
  "gender",
  "course",
  "Create date",
  "Action",
];

export function Employee() {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const { error, loading, employees } = useSelector((state) => state.employees);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.editemployee
  );
  const deletehandler = (id) => {
    dispatch(deleteEmployee(id));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Product Deleted Successfully");

      dispatch({ type: DELETE_EMPLOYEE_RESET });
    }

    dispatch(getEmployee(keyword));
  }, [getEmployee, dispatch, keyword, deleteError, clearErrors, isDeleted]);
  function processDate(date) {
    // Use the date object inside the function
    console.log("Received date:", date);
    console.log("Year:", date.getFullYear());
    console.log("Month:", date.getMonth() + 1); // Adding 1 because getMonth() returns a zero-based index
    console.log("Day:", date.getDate());
  }

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Employees list
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button className="flex items-center gap-3" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
              <CreateEmployee />
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.employee &&
              employees.employee.map(
                (
                  {
                    _id,
                    name,
                    email,
                    number,
                    designation,
                    gender,
                    course,
                    createdAt,
                  },
                  index
                ) => {
                  const isLast = index === employees.employee.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={name}>
                      <td className={classes}>
                        {" "}
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal">
                          {_id}
                        </Typography>
                      </td>

                      <td className={classes}>
                        {" "}
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal">
                          {name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        {" "}
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal">
                          {email}
                        </Typography>
                      </td>
                      <td className={classes}>
                        {" "}
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal">
                          {number}
                        </Typography>
                      </td>
                      <td className={classes}>
                        {" "}
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal">
                          {designation}
                        </Typography>
                      </td>
                      <td className={classes}>
                        {" "}
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal">
                          {gender}
                        </Typography>
                      </td>
                      <td className={classes}>
                        {" "}
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal">
                          {course}
                        </Typography>
                      </td>
                      <td className={classes}>
                        {" "}
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal">
                          {createdAt && createdAt.slice(0, 10)}
                        </Typography>
                      </td>

                      <td className={classes}>
                        {" "}
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal">
                          <Button
                            onClick={() => navigate(`/employee/update/${_id}`)}
                            className="m-1 items-center gap-3"
                            size="sm"
                            color="blue">
                            edit
                          </Button>
                          <Button
                            className=" items-center gap-3"
                            size="sm"
                            color="red"
                            onClick={() => deletehandler(_id)}>
                            delete
                          </Button>
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
