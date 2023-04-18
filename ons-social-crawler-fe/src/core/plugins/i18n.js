import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    entities: {
      assets: {
        detail: 'Asset detail',
        logos: 'Asset Logos',
        colors: 'Asset Colors'
      },
      contactRoles: {
        add: 'Add Contact Role',
        edit: 'Edit Contact Role',
        detail: 'Contact Role Detail',
        name: 'Contact role',
        code: 'Code',
        notes: 'Notes'
      },
      representativeRoles: {
        add: 'Add Representative Role',
        edit: 'Edit Representative Role',
        detail: 'Representative Role Detail',
        name: 'Representative role',
        code: 'Code',
        notes: 'Notes'
      },
      companyTypes: {
        add: 'Add Company Type',
        edit: 'Edit Company Type',
        detail: 'Company Type Detail',
        name: 'Company Type',
        code: 'Code',
        notes: 'Notes'
      },
      attachmentTypes: {
        add: 'Add Attachment Type',
        edit: 'Edit Attachment Type',
        detail: 'Attachment Type Detail',
        name: 'Attachment Type',
        code: 'Code',
        notes: 'Notes',
        attachmentContext: 'Attachment Context'
      },
      productCategories: {
        add: 'Add Product Category',
        edit: 'Edit Product Category',
        detail: 'Product Category Detail',
        name: 'Product Category',
        code: 'Code',
        notes: 'Notes',
        invoicing: 'Invoicing'
      },
      contacts: {
        add: 'Add Contact',
        edit: 'Edit Contact',
        detail: 'Contact detail',
        crmContactRoleId: 'Contact Role',
        advisor: 'Advisor',
        name: 'Name',
        department: 'Department',
        email1: 'E-mail (primary)',
        email2: 'E-mail (secondary)',
        phone1: 'Phone (primary)',
        phone2: 'Phone (secondary)',
        mobile1: 'Mobile (primary)',
        mobile2: 'Mobile (secondary)',
        companyMemo: 'Company (memo)'
      },
      representatives: {
        add: 'Add Representative',
        edit: 'Edit Representative',
        detail: 'Representative Detail',
        notes: 'Notes'
      },
      eventActivityTypes: {
        add: 'Add Event/Activity Type',
        edit: 'Edit Event/Activity Type',
        detail: 'Event/Activity Type Detail',
        name: 'Event/Activity Type',
        code: 'Code',
        notes: 'Notes',
        eventActivityContext: 'Event/Activity Context'
      },
      attachmentContexts: {
        detail: 'Attachment Context Detail',
        name: 'Attachment Context',
        code: 'Code',
        notes: 'Notes'
      },
      eventActivityContexts: {
        detail: 'Event/Activity Context Detail',
        name: 'Event/Activity Context',
        code: 'Code',
        notes: 'Notes'
      },
      opportunityPhases: {
        detail: 'Opportunity Phase Detail',
        name: 'Opportunity Phase',
        code: 'Code',
        notes: 'Notes'
      },
      commercialProposalPhases: {
        detail: 'Commercial Proposal Phase Detail',
        name: 'Commercial Proposal Phase',
        code: 'Code',
        notes: 'Notes'
      },
      hotPhases: {
        detail: 'HOT Phase Detail',
        name: 'HOT Phase',
        code: 'Code',
        notes: 'Notes'
      },
      lafPhases: {
        detail: 'LAF Phase Detail',
        name: 'LAF Phase',
        code: 'Code',
        notes: 'Notes'
      },
      reviewStatus: {
        detail: 'Review Status Detail',
        name: 'Review Status',
        code: 'Code',
        notes: 'Notes'
      },
      unitOccupancyStatus: {
        detail: 'Unit Occupancy Status Detail',
        name: 'Unit Occupancy Status',
        code: 'Code',
        notes: 'Notes'
      },
      expansionSteps: {
        detail: 'Expansion Step Detail',
        asset: 'Asset',
        name: 'Expansion Step',
        code: 'Code',
        openDate: 'Open Date',
        notes: 'Notes'
      },
      users: {
        add: 'Add User',
        edit: 'Edit User',
        detail: 'User Detail',
        name: 'User',
        email: 'Email',
        roles: 'Roles',
        password: 'Password',
        passwordConfirmation: 'Password Confirmation',
        fullName: 'Name Surname',
        crmUserRoles: 'User Roles'
      },
      userRoles: {
        detail: 'User Role Detail',
        roleName: 'Role Name'
      },
      interestLevels: {
        detail: 'Interest Level Detail',
        name: 'Interest Level',
        code: 'Code',
        notes: 'Notes'
      },
      brands: {
        add: 'Add Brand',
        edit: 'Edit Brand',
        detail: 'Detail Brand',
        name: 'Name',
        marketedBrands: 'Marketed Brands',
        productCategory: 'Product Category',
        description: 'Description',
        notes: 'Notes'
      },
      companies: {
        add: 'Add Company',
        edit: 'Edit Company',
        detail: 'Detail Company',
        name: 'Name',
        companyType: 'Company Type',
        advisor: 'Advisor',
        companyAdvisor: 'Company Advisor',
        dit: 'DIT',
        vatNumber: 'VAT Number',
        fiscalCode: 'Fiscal Code',
        web: 'Web',
        pec: 'PEC',
        email1: 'Email (primary)',
        email2: 'Email (secondary)',
        phone1: 'Phone (primary)',
        phone2: 'Phone (secondary)',
        legalHqAddress: 'Legal HQ address',
        operationalHqAddress: 'Operational HQ address',
        description: 'Description',
        notes: 'Notes'
      },
      units: {
        add: 'Add Unit',
        edit: 'Edit Unit',
        detail: 'Detail Unit',
        asset: 'Asset',
        code: 'Code',
        horizonId: 'Horizon ID',
        negoId: 'Unit ID in Nego',
        active: 'Active',
        expansionStep: 'Expansion Step',
        gla: 'GLA (sqmt)',
        sla: 'SLA (sqmt)',
        landRegisterData: 'Land reg. data',
        unitOccupancyStatus: 'Occupancy Status',
        manualUnitOccupancyStatus: 'Manually set Status',
        estimatedOccupancyStartDate: 'Occupancy start date',
        estimatedOccupancyEndDate: 'Occupancy end date',
        occupancyBreak: 'Occupancy break',
        interruptionDate: 'Interruption date',
        mbrSqm: 'MBR (€/sqmt)',
        mbrSqmAnnualized: 'MBR annual. (€/sqmt)',
        mbrErvSqm: 'ERV (€/sqmt)',
        scmSqm: 'SCM (€/sqmt)',
        scmSqmAnnualized: 'SCM annual. (€/sqmt)',
        scmErvSqm: 'ERV SCM (€/sqmt)',
        negoNotes: 'Nego notes',
        notes: 'Notes'
      }
    },
    pagesName: {},
    common: {
      search: 'Search',
      confirm: 'Confirm',
      close: 'Close',
      insertValue: 'Insert value',
      requiredField: 'Required field',
      ok: 'Ok',
      operationconfirm: 'Operation succesfully complete!',
      cancel: 'Cancel',
      confirmMessage: 'This action cannot be undone. Are you sure you want to proceed?',
      yes: 'Yes',
      no: 'No',
      signout: 'Sign Out',
      signin: 'Sign In',
      email: 'Email',
      continue: 'Continue',
      password: 'Password',
      tryAgain: 'Try again!',
      okLong: 'Ok, got it!',
      signinOk: 'You have successfully logged in!',
      signinError: 'Something is not right',
      validEmail: 'Email must be a valid email',
      passwordsDoNotMatch: 'Passwords do not match',
      totalRows: 'Total Rows',
      selectDate: 'Select a date'
    },
    tables: {
      actions: 'Actions',
      asset: 'Asset',
      contactRole: 'Contact Role',
      code: 'Code',
      name: 'Name',
      department: 'Department',
      acronym: 'Acronym',
      propertyRef: 'Property Ref.',
      owner: 'Owner',
      vatNumber: 'VAT Number',
      fiscalCode: 'Fiscal Code',
      pec: 'PEC',
      ateco: 'ATECO',
      currentTotalUnits: 'Total Units (#)',
      currentLeasedOutUnits: 'Leased out Units (#)',
      representativeRole: 'Representative Role',
      companyType: 'Company Type',
      attachmentType: 'Attachment Type',
      attachmentContext: 'Attachment Context',
      productCategory: 'Product Category',
      invoicing: 'Invoicing',
      eventActivityContext: 'Event/Activity Context',
      eventActivityType: 'Event/Activity Type',
      opportunityPhase: 'Opportunity Phase',
      commercialProposalPhase: 'Commercial Proposal Phase',
      hotPhase: 'HOT Phase',
      lafPhase: 'LAF Phase',
      reviewStatus: 'Review Status',
      unitOccupancyStatus: 'Occupancy Status',
      expansionStep: 'Expansion Step',
      openDate: 'Open Date',
      user: 'User',
      email: 'Email',
      roles: 'Roles',
      brands: 'Brand',
      marketedBrands: 'Marketed Brands',
      company: 'Company',
      advisor: 'Advisor',
      companyAdvisor: 'Company Advisor',
      dit: 'DIT',
      web: 'Web',
      legalHqAddress: 'Legal HQ address',
      operationalHqAddress: 'Operational HQ address',
      legalHQAddress: 'Legal HQ address',
      sDIBillingID: 'SDI billing ID',
      iSTATMunicipalityID: 'ISTAT mun. ID',
      operationalHQAddress: 'Operational HQ address',
      currentVacantUnits: 'Vacant Units (#)',
      currentActiveGLA: 'Active GLA (sqmt)',
      currentLeasedOutGLA: 'Leased out GLA (sqmt)',
      currentVacantGLA: 'Vacant GLA (sqmt)',
      crmContactRoleId: 'Contact Role',
      email1: 'E-mail (primary)',
      email2: 'E-mail (secondary)',
      phone1: 'Phone (primary)',
      phone2: 'Phone (secondary)',
      mobile1: 'Mobile (primary)',
      mobile2: 'Mobile (secondary)',
      companyMemo: 'Company (memo)',
      horizonId: 'Horizon ID',
      negoId: 'Unit ID in Nego',
      active: 'Active',
      gla: 'GLA (sqmt)',
      sla: 'SLA (sqmt)',
      landRegisterData: 'Land reg. data',
      manualUnitOccupancyStatus: 'Manually set Status',
      estimatedOccupancyStartDate: 'Occupancy start date',
      estimatedOccupancyEndDate: 'Occupancy end date',
      occupancyBreak: 'Occupancy break',
      interruptionDate: 'Interruption date',
      mbrSqm: 'MBR (€/sqmt)',
      mbrSqmAnnualized: 'MBR annual. (€/sqmt)',
      mbrErvSqm: 'ERV (€/sqmt)',
      scmSqm: 'SCM (€/sqmt)',
      scmSqmAnnualized: 'SCM annual. (€/sqmt)',
      scmErvSqm: 'ERV SCM (€/sqmt)',
      interestLevels: 'Interest Level'
    }
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  globalInjection: true,
  messages
})

export default i18n
