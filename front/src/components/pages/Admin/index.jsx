import React from 'react'
import FileUpload from "../../common/FileUpload"
import { ListUsers } from '../../common/ListUsers'

export const AdminPanel = () => {
    return (
        <>
            <ListUsers />
            <FileUpload />
        </>
    )
}
