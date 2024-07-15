"use client";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

interface IData {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    ielts: number;
}

const Page = () => {
    const [data, setData] = useState<IData[]>([]);

    const [modal, setModal] = useState(false);

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [ielts, setIelts] = useState<number>(0.5);

    useEffect(() => {
        const users = localStorage.getItem("users");
        if (users) {
            setData([...data, ...JSON.parse(users)]);
        } else {
            setData([
                {
                    id: new Date().getTime(),
                    firstName: "Usmonjon",
                    lastName: "Hasanov",
                    username: "DevMERN",
                    ielts: 7.5,
                },
            ]);
        }
    }, []);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (firstName && lastName && username && ielts) {
            const condition = confirm(
                `Check the result!\n\nFirst Name: ${firstName}\nLast Name: ${lastName}\nusername: ${username}\nIELTS score: ${ielts}\n\nAre you sure?`,
            );
            if (condition) {
                const newData = {
                    id: new Date().getTime(),
                    firstName,
                    lastName,
                    username,
                    ielts,
                };
                setData([...data, newData]);
                localStorage.setItem(
                    "users",
                    JSON.stringify([...data, newData]),
                );
                setFirstName("");
                setLastName("");
                setUsername("");
                setIelts(0.5);
                setModal(false);
            }
        } else {
            alert("All fields are required");
        }
    };

    const inputHandler = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        switch (e.target.name) {
            case "firstname":
                setFirstName(e.target.value);
                break;
            case "lastname":
                setLastName(e.target.value);
                break;
            case "username":
                /[^a-zA-Z0-9]/.test(e.target.value)
                    ? setUsername(e.target.value.slice(0, -1))
                    : setUsername(e.target.value);
                break;
            case "ielts":
                setIelts(Number(e.target.value));
                break;
            default:
                break;
        }
    };

    const modalHandler = () => {
        setModal(!modal);
    };

    const deleteHandler = (id: number) => {
        const condition = confirm("Are you sure?");
        if (condition) {
            const newData = data.filter((item) => item.id !== id);
            setData(newData);
            localStorage.setItem("users", JSON.stringify(newData));
        }
    };

    return (
        <main className="w-full h-screen overflow-hidden">
            <div className="w-full max-w-[1200px] px-[40px] m-[0_auto]">
                <button
                    onClick={modalHandler}
                    title="Add"
                    className="rounded-full w-[50px] h-[50px] flex justify-center items-center mt-[50px] hover:bg-[#303030] focus:bg-[#303030] outline-none"
                >
                    <FaPlus size={20} />
                </button>
                <div className="w-full mt-[50px] rounded-lg overflow-hidden tbl table-wrapper max-h-[70vh] overflow-y-auto">
                    <table className="w-full text-center">
                        <thead className="bg-[#222]">
                            <tr>
                                <th className="md:table-cell hidden"># ID</th>
                                <th className="md:table-cell hidden">
                                    First Name
                                </th>
                                <th className="md:table-cell hidden">
                                    Last Name
                                </th>
                                <th className="md:table-cell hidden">
                                    username
                                </th>
                                <th className="md:table-cell hidden">IELTS</th>
                                <th className="md:table-cell hidden">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, idx) => (
                                <tr
                                    className="bg-[#101010] md:bg-none flex flex-col items-start md:table-row"
                                    key={item.id}
                                >
                                    <td className="before:content-['#'] md:before:content-none before:pr-[5px]">
                                        {idx + 1}
                                    </td>
                                    <td className="before:content-['First_Name:'] before:font-medium md:font-medium font-thin md:before:content-none before:pr-[5px]">
                                        {item.firstName}
                                    </td>
                                    <td className="before:content-['Last_Name:'] before:font-medium md:font-medium font-thin md:before:content-none before:pr-[5px]">
                                        {item.lastName}
                                    </td>
                                    <td className="before:content-['username:'] before:font-medium md:font-medium font-thin md:before:content-none before:pr-[5px]">
                                        {item.username}
                                    </td>
                                    <td className="before:content-['IELTS:'] before:font-medium md:font-medium font-thin md:before:content-none before:pr-[5px]">
                                        {item.ielts}
                                    </td>
                                    <td className="w-full md:w-[initial]">
                                        <button
                                            className="w-full md:w-[initial] bg-red-600 hover:bg-red-800 p-2 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-red-400 ring-offset-transparent outline-none"
                                            onClick={() =>
                                                deleteHandler(item.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div
                    className={`position relative top-0 left-0 z-50 w-full h-screen animate-fade-show ${
                        modal ? "block" : "hidden"
                    }`}
                >
                    <div
                        className="z-[49] bg-[#47474780] w-full h-screen fixed top-0 left-0"
                        onClick={modalHandler}
                    ></div>
                    <form
                        onSubmit={submitHandler}
                        className="z-[51] max-w-[600px] w-full sm:rounded-lg table-wrapper fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-black p-[30px]"
                    >
                        <button
                            type="button"
                            onClick={modalHandler}
                            title="close"
                            className="absolute top-0 right-0 w-[50px] h-[50px] flex justify-center items-center hover:bg-[#303030] focus:bg-[#303030] outline-none sm:rounded-tr-lg"
                        >
                            <IoClose size={30} />
                        </button>
                        <input
                            value={firstName}
                            onChange={inputHandler}
                            type="text"
                            className="form-control mt-[50px]"
                            placeholder="First Name"
                            name="firstname"
                        />
                        <input
                            value={lastName}
                            onChange={inputHandler}
                            type="text"
                            className="form-control"
                            placeholder="Last Name"
                            name="lastname"
                        />
                        <input
                            value={username}
                            onChange={inputHandler}
                            type="text"
                            className="form-control"
                            placeholder="username"
                            name="username"
                        />
                        <select
                            value={ielts}
                            onChange={inputHandler}
                            name="ielts"
                            title="ielts scroe"
                            className="form-control"
                        >
                            <option value="0.5">0.5</option>
                            <option value="1">1</option>
                            <option value="1.5">1.5</option>
                            <option value="2">2</option>
                            <option value="2.5">2.5</option>
                            <option value="3">3</option>
                            <option value="3.5">3.5</option>
                            <option value="4">4</option>
                            <option value="4.5">4.5</option>
                            <option value="5">5</option>
                            <option value="5.5">5.5</option>
                            <option value="6">6</option>
                            <option value="6.5">6.5</option>
                            <option value="7">7</option>
                            <option value="7.5">7.5</option>
                            <option value="8">8</option>
                            <option value="8.5">8.5</option>
                            <option value="9">9</option>
                            <option value="9.5">9.5</option>
                        </select>
                        <button
                            disabled={
                                !firstName || !lastName || !username || !ielts
                            }
                            className="w-full p-[10px] text-[20px] font-medium mt-[20px] bg-[#303030] hover:bg-[#404040] focus:bg-[#404040] outline-none rounded-lg"
                            type="submit"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Page;
