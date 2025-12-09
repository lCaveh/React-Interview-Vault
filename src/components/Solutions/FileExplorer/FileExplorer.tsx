import React, { ReactElement, useState } from "react";

const FileExplorer = (): ReactElement => {
    const root = [
        {
            "id": "folder_1",
            "name": "src",
            "children": [
                {
                    "id": "folder_2",
                    "name": "components",
                    "children": [
                        {
                            "id": "file_1",
                            "name": "Button.tsx"
                        },
                        {
                            "id": "file_2",
                            "name": "Header.tsx"
                        }
                    ]
                },
                {
                    "id": "folder_3",
                    "name": "utils",
                    "children": [
                        {
                            "id": "file_3",
                            "name": "helpers.ts"
                        }
                    ]
                },
                {
                    "id": "file_4",
                    "name": "index.tsx"
                }
            ]
        },
        {
            "id": "folder_4",
            "name": "public",
            "children": [
                {
                    "id": "file_5",
                    "name": "favicon.ico"
                }
            ]
        },
        {
            "id": "file_6",
            "name": "package.json"
        }
    ];

    type IsOpen = {
        [id: string]: string
    }
    const [isOpen, setIsOpen] = useState<IsOpen>({})
    const ShowFile = ({ root, dept = 0 }) => (
        root.map(item => (
            <>
                {item.children ? <div key={item.id}>
                    <div onClick={() => setIsOpen({ ...isOpen, [item.id]: !isOpen[item.id] })} style={{ marginLeft: dept }} className="file-explorer-folder">📁 {item.name}</div>
                    {isOpen[item.id] && <ShowFile root={item.children} dept={dept + 8} />}
                </div> : <div key={item.id} style={{ marginLeft: dept }}>📄 {item.name}</div>}
            </>
        ))
    )

    return <div className="file-explorer-wrapper">
        <ShowFile root={root} />
    </div>
}

export default FileExplorer;
