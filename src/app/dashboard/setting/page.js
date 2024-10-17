"use client";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteItemInfoById, updateUserInfo } from "@/store/actions/useUser";
import { CurrencyDollarIcon, InformationCircleIcon, TrashIcon, CalendarIcon } from "@heroicons/react/solid";
import { countries } from "countries-list";
import {
    Card,
    Grid,
    Title,
    Text,
    Flex,
    Metric,
    Icon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
    Button,
    TextInput,
    SearchSelect,
    SearchSelectItem,
    NumberInput
} from "@tremor/react";
import { isEmpty } from "@/utils/util";
import Modal from "@/components/Basic/Modal";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import apiCall from "@/utils/apiCall";
import useGetAccounts from "@/hooks/useGetAccounts";
import Link from "next/link";

export default function Setting() {
    const dispatch = useDispatch();
    const { user, items } = useSelector(state => state.user);
    const [userInfo, setUserInfo] = useState({});
    const [showModal, setShowModal] = useState(false);

    useGetAccounts();

    // const fetchData = useCallback(() => {
    //     dispatch(getUserInfo());
    // }, [dispatch]);

    // useEffect(() => {
    //     fetchData();
    // }, []);

    useEffect(() => {
        setUserInfo(user);
    }, [user]);

    const handleDelete = item_id => {
        dispatch(deleteItemInfoById(item_id));
    };

    const setSalary = salary => {
        if (!isEmpty(salary) && parseInt(salary) > 0) setUserInfo({ ...userInfo, salary: String(salary) });
    };

    const setSalaryDate = payday => {
        const temp = parseInt(payday);
        if (!isEmpty(payday) && temp > 0 && temp < 32) setUserInfo({ ...userInfo, payday: String(temp) });
    };

    const handleDeleteAccount = () => {
        apiCall.delete("/api/v1/user").then(res => {
            signOut();
        });
    };

    const handleUpdatePro = () => {
        toast.success("coming soon!");
    };

    const handleUpdateUserInfo = () => {
        dispatch(updateUserInfo(userInfo));
    };

    const handleCheckProducts = (e, product) => {
        if (isEmpty(e.target.checked)) return;
        if (e.target.checked) {
            setUserInfo({
                ...userInfo
            });
        } else {
            setUserInfo({
                ...userInfo
            });
        }
    };

    return (
        <main className="min-h-screen p-4 m-auto max-w-7xl bg-muted/50">
            {/* <Text className="mt-6">
                {"A bird's eye view of your financial positions."}
            </Text> */}
            <Grid numItemsLg={2} className="gap-6 mt-6">
                <Card className="px-4 sm:px-6">
                    <Metric className="truncate">User Info</Metric>
                    <Flex className="mt-4 space-x-2">
                        <Text className="w-1/3 truncate">Display Name</Text>
                        <TextInput
                            placeholder="User Name"
                            value={userInfo?.name ?? ""}
                            onChange={e =>
                                setUserInfo({
                                    ...userInfo,
                                    name: e.target.value
                                })
                            }
                        />
                    </Flex>
                    <Flex className="mt-4 space-x-2">
                        <Text className="w-1/3 truncate">Set Location</Text>
                        <SearchSelect
                            placeholder="Country"
                            value={userInfo?.country ?? ""}
                            onValueChange={country => setUserInfo({ ...userInfo, country })}
                            defaultValue={user?.country}
                        >
                            {Object.keys(countries)?.map(key => (
                                <SearchSelectItem key={countries[key].name} value={countries[key].name}>
                                    {countries[key].name}
                                </SearchSelectItem>
                            ))}
                        </SearchSelect>
                    </Flex>
                    <Flex className="mt-4 space-x-2">
                        <div className="w-1/3 truncate" />
                        <div className="flex w-full min-w-[10rem]">
                            <TextInput
                                className="mr-4 min-w-[5rem]"
                                placeholder="State"
                                onChange={e =>
                                    setUserInfo({
                                        ...userInfo,
                                        state: e.target.value
                                    })
                                }
                                value={userInfo?.state ?? ""}
                            />
                            <TextInput
                                className="min-w-[5rem]"
                                placeholder="City"
                                onChange={e =>
                                    setUserInfo({
                                        ...userInfo,
                                        city: e.target.value
                                    })
                                }
                                value={userInfo?.city ?? ""}
                            />
                        </div>
                    </Flex>
                    <Flex className="mt-4 space-x-2">
                        <Text className="w-1/3 truncate">Set Salary</Text>
                        <div className="flex w-full min-w-[10rem]">
                            <NumberInput
                                className="mr-4 min-w-[5rem]"
                                icon={CurrencyDollarIcon}
                                placeholder="type amount"
                                enableStepper={false}
                                min={0}
                                onValueChange={setSalary}
                                value={userInfo?.salary ?? ""}
                            />
                            <NumberInput
                                className="min-w-[5rem]"
                                icon={CalendarIcon}
                                placeholder="pay day"
                                max={31}
                                min={1}
                                enableStepper={false}
                                onValueChange={setSalaryDate}
                                value={userInfo?.payday ?? ""}
                            />
                        </div>
                    </Flex>
                    <Flex className="mt-4 space-x-2">
                        <div className="w-1/3 truncate" />
                        <Flex className="flex-col sm:flex-row">
                            <Button color="red" className="w-full sm:w-auto" onClick={() => setShowModal(true)}>
                                Delete Account
                            </Button>
                            <Link
                                href={`/dashboard/checkout/${user.isPro ? "cancel" : ""}`}
                                className="w-full my-2 sm:my-0 sm:w-auto"
                            >
                                <Button color="gray" className="w-full">
                                    {user.isPro ? "Cancel Subscription" : "Subscription"}
                                </Button>
                            </Link>
                            <Button color="black" className="w-full sm:w-auto" onClick={() => handleUpdateUserInfo()}>
                                Update
                            </Button>
                        </Flex>
                    </Flex>
                </Card>
                <Card className="px-4 sm:px-6">
                    <Metric className="truncate">Twilio</Metric>
                    {/* <Flex className="mt-4 space-x-2">
                        <Text className="w-1/3 truncate">OpenAI Key</Text>
                        <TextInput
                            value={userInfo?.openAiKey ?? ""}
                            onChange={e =>
                                setUserInfo({
                                    ...userInfo,
                                    openAiKey: e.target.value
                                })
                            }
                        />
                    </Flex>
                    <Flex className="mt-4 space-x-2">
                        <Text className="w-1/3 truncate">Database Key</Text>
                        <TextInput
                            value={userInfo?.mongoDBURL ?? ""}
                            onChange={e =>
                                setUserInfo({
                                    ...userInfo,
                                    mongoDBURL: e.target.value
                                })
                            }
                        />
                    </Flex> */}
                    <Flex className="mt-4 space-x-2">
                        <Text className="w-2/3 truncate">Phone (consent to SMS, fees apply)</Text>
                        <PhoneInput
                            inputComponent={TextInput}
                            placeholder="Enter phone number"
                            value={userInfo?.phone ?? ""}
                            onChange={phone =>
                                setUserInfo({
                                    ...userInfo,
                                    phone
                                })
                            }
                        />
                    </Flex>
                    <Flex className="mt-4 space-x-2">
                        <Text className="w-1/3 truncate">Twilio Token</Text>
                        <TextInput
                            value={userInfo?.twilioToken ?? ""}
                            onChange={e =>
                                setUserInfo({
                                    ...userInfo,
                                    twilioToken: e.target.value
                                })
                            }
                        />
                    </Flex>
                    {/* <Tooltip>
                        <TooltipTrigger asChild>
                            <Flex className="mt-4 space-x-2">
                                <Text className="w-1/3 truncate">
                                    Store All Data
                                </Text>
                                <Flex>
                                    <Checkbox
                                        checked={userInfo?.storeAYear}
                                        handleChange={e =>
                                            setUserInfo({
                                                ...userInfo,
                                                storeAYear: e.target.checked
                                            })
                                        }
                                    />
                                </Flex>
                            </Flex>
                        </TooltipTrigger>
                        <TooltipContent>
                            Default Store Period is a year. If you enable this
                            setting, it will store all data
                        </TooltipContent>
                    </Tooltip> */}
                    <Flex className="mt-4 space-x-2">
                        <div className="w-1/3 truncate" />
                        <Flex>
                            <Button color="black" onClick={() => handleUpdateUserInfo()}>
                                Save
                            </Button>
                        </Flex>
                    </Flex>
                </Card>
            </Grid>
            <Card className="px-4 mt-6 sm:px-6">
                <div>
                    <Flex className="space-x-0.5" justifyContent="start" alignItems="center">
                        <Title>Institutions and Accounts</Title>
                        <Icon
                            icon={InformationCircleIcon}
                            variant="simple"
                            tooltip="Shows all the institutions and accounts available"
                            color="slate"
                        />
                    </Flex>
                </div>
                <Table className="mt-6 w-[calc(100vw_-_theme(spacing.16))] sm:w-full overflow-auto m-auto">
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell>Institution</TableHeaderCell>
                            <TableHeaderCell className="text-right">Account Name</TableHeaderCell>
                            <TableHeaderCell className="text-right">Account Type</TableHeaderCell>
                            <TableHeaderCell className="text-right">Account SubType</TableHeaderCell>
                            <TableHeaderCell />
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {items?.map(item => {
                            return item?.accounts?.map((account, index) => (
                                <TableRow key={`acc_${index}`}>
                                    <TableCell>{index == 0 && item.institution.name}</TableCell>
                                    <TableCell className="text-right">{account.name}</TableCell>
                                    <TableCell className="text-right">{account.type}</TableCell>
                                    <TableCell className="text-right">{account.subtype}</TableCell>
                                    <TableCell className="text-right">
                                        {index == 0 && (
                                            <Icon
                                                onClick={() => handleDelete(item.id)}
                                                className="cursor-pointer"
                                                icon={TrashIcon}
                                                color="slate"
                                                variant="simple"
                                                tooltip="Remove this Access Account"
                                            />
                                        )}
                                    </TableCell>
                                </TableRow>
                            ));
                        })}
                    </TableBody>
                </Table>
            </Card>
            <Modal
                showModal={showModal}
                setShowModal={setShowModal}
                type="delete"
                title="Delete Account?"
                content="Your Account and information will be deleted forever."
                onOk={handleDeleteAccount}
            />
        </main>
    );
}
