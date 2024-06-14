import React, { Fragment } from 'react'
import { Table, TableBody, TableCell, TableRow } from "../Table"
import { maskCnpj, maskInscEstadual } from "@/Utils/mask"
import moment from "moment"
import { DeleteButton, EditButton } from "../Buttons"

interface FilialProps {
    filiais: any
}

const Filiais = ({ filiais }: FilialProps) => {
    return (
        <Table>
            <TableBody>
                {filiais?.map((filial: any) => (
                    <Fragment key={filial.id}>
                        <TableRow>
                            <TableCell className="w-8 text-right text-sm text-gray-500 font-bold">{filial.id}</TableCell>
                            <TableCell className="w-44">
                                {filial.corpreason}
                            </TableCell>
                            <TableCell className="w-20">
                                {filial.subnumber}
                            </TableCell>
                            <TableCell className="w-40">
                                {filial.subname}
                            </TableCell>
                            <TableCell>
                                {maskCnpj(filial.cnpj.toString())}
                            </TableCell>
                            <TableCell>
                                {maskInscEstadual(filial.statereg.toString())}
                            </TableCell>
                            <TableCell>
                                {filial.telephone}
                            </TableCell>
                            <TableCell>
                                {moment(
                                    filial.created_at,
                                ).format("DD/MM/YYYY")}
                            </TableCell>
                            <TableCell className="flex items-center justify-end gap-2">
                                <EditButton
                                    url={route(
                                        "companies.edit",
                                        filial.id,
                                    )}
                                />
                                <DeleteButton
                                    url="companies.destroy"
                                    param={filial.id}
                                    identify={`o filial ${filial.subname}`}
                                />
                            </TableCell>
                        </TableRow>
                    </Fragment>
                ))}
            </TableBody>
        </Table>
    )
}

export default Filiais