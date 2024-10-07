import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable as DndDraggable,
} from "react-beautiful-dnd";

function reorder(array, startIndex, endIndex) {
  const result = Array.from(array);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

function Draggable({ array = [], renderItem, onDragEnd }) {
  function handleDragEnd(result) {
    if (!result.destination) return;
    const reorderedArray = reorder(
      array,
      result.source.index,
      result.destination.index
    );
    onDragEnd(reorderedArray);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppableList">
        {(provided) => (
          <div
            className="flex flex-col gap-4"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {array.map((item = {}, index) => (
              <DndDraggable
                key={item.id || item.name}
                draggableId={item.id || item.name}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {renderItem(item, index)}
                  </div>
                )}
              </DndDraggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Draggable;
