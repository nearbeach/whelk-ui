const ObjectTypeEnums = {
    customer: "customer",
    kanban_board: 'kanban_board',
    kanban_card: "kanban_card",
    organisation: "organisation",
    request_for_change: "request_for_change",
    requirement: "requirement",
    requirement_item: "requirement_item",
    project: "project",
    task: "task",
}

type ObjectTypeEnums = (typeof ObjectTypeEnums)[keyof typeof ObjectTypeEnums]

export { ObjectTypeEnums }