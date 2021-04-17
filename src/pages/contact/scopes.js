export const scopes = {
  contacts: {
    type: 'person',
    title: 'Contacts',
  },
  students: {
    type: 'student',
    title: 'Students',
  },
  employees: {
    type: 'employee',
    title: 'Employees',
  },
  companies: {
    type: 'company',
    title: 'Companies',
  },
}

export default type => scopes[type]