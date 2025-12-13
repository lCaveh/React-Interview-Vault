import React, { ReactElement, useState } from "react";

const DragDropGame = (): ReactElement => {
    type Ring = {
        id: number;
        color: string;
        width: number;
    }
    type Bars = {
        [str: string]: Ring[];
    }
    const [bars, setBars] = useState<Bars>({
        left: [
            { id: 1, color: 'black', width: 120 },
            { id: 2, color: 'blue', width: 100 },
            { id: 3, color: 'red', width: 80 },
            { id: 4, color: 'orange', width: 60 },
            { id: 5, color: 'green', width: 40 }
        ],
        right: []
    })
    type DraggedRing = {
        ring: Ring;
        col: string;
    } | null
    const [draggedRing, setDarggedRing] = useState<DraggedRing>(null)
    const onDrag = (ring, col) => {
        setDarggedRing({ ring, col })
    }
    const onDragOver = (e) => {
        e.preventDefault()
    }
    const onDrop = (newCol) => {
        console.log(newCol)
        if (!draggedRing || newCol === draggedRing.col) return;
        setBars({
            ...bars,
            [draggedRing.col]: [...bars[draggedRing.col].filter(ring => ring.id !== draggedRing.ring.id)],
            [newCol]: [...bars[newCol], draggedRing.ring]
        })
        setDarggedRing(null)
    }
    return <div className="ddg-wrapper">
        <div className="ddg-bar" onDrop={() => { onDrop('left') }} onDragOver={onDragOver}>
            <div className="ddg-base">
                <div className="ddg-col" ></div>
            </div>
            {bars.left.map(ring => <div
                className="ddg-ring"
                onDragStart={() => { onDrag(ring, 'left') }}
                key={ring.id}
                style={{ width: ring.width, backgroundColor: ring.color }}
                draggable={ring.id===bars.left[bars.left.length-1]?.id} />)}
        </div>
        <div className="ddg-bar" onDrop={() => { onDrop('right') }} onDragOver={onDragOver}>
            <div className="ddg-base" >
                <div className="ddg-col" ></div>
            </div>
            {bars.right.map(ring => <div
            className="ddg-ring"
                onDragStart={() => { onDrag(ring, 'right') }}
                key={ring.id}
                style={{ width: ring.width, backgroundColor: ring.color }}
                draggable={ring.id===bars.right[bars.right.length-1]?.id} />)}
        </div>
    </div>
}

export default DragDropGame;
