"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
exports.default = {
    up: function (queryInterface, Sequelize) { return queryInterface.createTable('Boletos', {
        id: {
            type: sequelize_1.STRING,
            primaryKey: true,
            allowNull: false
        },
        token: {
            type: sequelize_1.STRING,
            allowNull: false
        },
        queue_url: {
            type: sequelize_1.STRING,
            allowNull: false
        },
        status: {
            type: sequelize_1.ENUM,
            allowNull: false,
            values: [
                'issued',
                'pending_registration',
                'registered',
                'refused'
            ],
            defaultValue: 'issued'
        },
        expiration_date: {
            type: sequelize_1.DATE,
            allowNull: false
        },
        amount: {
            type: sequelize_1.INTEGER,
            allowNull: false
        },
        paid_amount: {
            type: sequelize_1.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        instructions: {
            type: sequelize_1.TEXT
        },
        issuer: {
            type: sequelize_1.STRING,
            allowNull: false
        },
        issuer_id: {
            type: sequelize_1.STRING
        },
        title_id: {
            type: sequelize_1.INTEGER,
            allowNull: false,
            autoIncrement: true
        },
        reference_id: {
            type: sequelize_1.STRING
        },
        barcode: {
            type: sequelize_1.STRING
        },
        payer_name: {
            type: sequelize_1.STRING
        },
        payer_document_type: {
            type: sequelize_1.ENUM,
            values: ['cpf', 'cnpj']
        },
        payer_document_number: {
            type: sequelize_1.STRING
        },
        company_name: {
            type: sequelize_1.STRING,
            allowNull: false
        },
        company_document_number: {
            type: sequelize_1.STRING,
            allowNull: false
        },
        bank_response_code: {
            type: sequelize_1.STRING
        },
        created_at: {
            type: sequelize_1.DATE,
            allowNull: false
        },
        updated_at: {
            type: sequelize_1.DATE,
            allowNull: false
        }
    })
        .then(function () { return queryInterface.addIndex('Boletos', ['queue_url']); })
        .then(function () { return queryInterface.addIndex('Boletos', ['status']); }); },
    down: function (queryInterface, Sequelize) { return queryInterface.dropTable('Boletos'); }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjAxNzA2MTIwMDAwMDAtY3JlYXRlLWJvbGV0by5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhYmFzZS9taWdyYXRpb25zLzIwMTcwNjEyMDAwMDAwLWNyZWF0ZS1ib2xldG8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBNkQ7QUFFN0Qsa0JBQWU7SUFDYixFQUFFLEVBQUUsVUFBQyxjQUFjLEVBQUUsU0FBUyxJQUFLLE9BQUEsY0FBYyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUU7UUFDdkUsRUFBRSxFQUFFO1lBQ0YsSUFBSSxFQUFFLGtCQUFNO1lBQ1osVUFBVSxFQUFFLElBQUk7WUFDaEIsU0FBUyxFQUFFLEtBQUs7U0FDakI7UUFFRCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsa0JBQU07WUFDWixTQUFTLEVBQUUsS0FBSztTQUNqQjtRQUVELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxrQkFBTTtZQUNaLFNBQVMsRUFBRSxLQUFLO1NBQ2pCO1FBRUQsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLGdCQUFJO1lBQ1YsU0FBUyxFQUFFLEtBQUs7WUFDaEIsTUFBTSxFQUFFO2dCQUNOLFFBQVE7Z0JBQ1Isc0JBQXNCO2dCQUN0QixZQUFZO2dCQUNaLFNBQVM7YUFDVjtZQUNELFlBQVksRUFBRSxRQUFRO1NBQ3ZCO1FBRUQsZUFBZSxFQUFFO1lBQ2YsSUFBSSxFQUFFLGdCQUFJO1lBQ1YsU0FBUyxFQUFFLEtBQUs7U0FDakI7UUFFRCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsbUJBQU87WUFDYixTQUFTLEVBQUUsS0FBSztTQUNqQjtRQUVELFdBQVcsRUFBRTtZQUNYLElBQUksRUFBRSxtQkFBTztZQUNiLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFlBQVksRUFBRSxDQUFDO1NBQ2hCO1FBRUQsWUFBWSxFQUFFO1lBQ1osSUFBSSxFQUFFLGdCQUFJO1NBQ1g7UUFFRCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsa0JBQU07WUFDWixTQUFTLEVBQUUsS0FBSztTQUNqQjtRQUVELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxrQkFBTTtTQUNiO1FBRUQsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLG1CQUFPO1lBQ2IsU0FBUyxFQUFFLEtBQUs7WUFDaEIsYUFBYSxFQUFFLElBQUk7U0FDcEI7UUFFRCxZQUFZLEVBQUU7WUFDWixJQUFJLEVBQUUsa0JBQU07U0FDYjtRQUVELE9BQU8sRUFBRTtZQUNQLElBQUksRUFBRSxrQkFBTTtTQUNiO1FBRUQsVUFBVSxFQUFFO1lBQ1YsSUFBSSxFQUFFLGtCQUFNO1NBQ2I7UUFFRCxtQkFBbUIsRUFBRTtZQUNuQixJQUFJLEVBQUUsZ0JBQUk7WUFDVixNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDO1NBQ3hCO1FBRUQscUJBQXFCLEVBQUU7WUFDckIsSUFBSSxFQUFFLGtCQUFNO1NBQ2I7UUFFRCxZQUFZLEVBQUU7WUFDWixJQUFJLEVBQUUsa0JBQU07WUFDWixTQUFTLEVBQUUsS0FBSztTQUNqQjtRQUVELHVCQUF1QixFQUFFO1lBQ3ZCLElBQUksRUFBRSxrQkFBTTtZQUNaLFNBQVMsRUFBRSxLQUFLO1NBQ2pCO1FBRUQsa0JBQWtCLEVBQUU7WUFDbEIsSUFBSSxFQUFFLGtCQUFNO1NBQ2I7UUFFRCxVQUFVLEVBQUU7WUFDVixJQUFJLEVBQUUsZ0JBQUk7WUFDVixTQUFTLEVBQUUsS0FBSztTQUNqQjtRQUVELFVBQVUsRUFBRTtZQUNWLElBQUksRUFBRSxnQkFBSTtZQUNWLFNBQVMsRUFBRSxLQUFLO1NBQ2pCO0tBQ0YsQ0FBQztTQUNELElBQUksQ0FBQyxjQUFNLE9BQUEsY0FBYyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFqRCxDQUFpRCxDQUFDO1NBQzdELElBQUksQ0FBQyxjQUFNLE9BQUEsY0FBYyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUE5QyxDQUE4QyxDQUFDLEVBOUd4QixDQThHd0I7SUFFM0QsSUFBSSxFQUFFLFVBQUMsY0FBYyxFQUFFLFNBQVMsSUFBSyxPQUFBLGNBQWMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQW5DLENBQW1DO0NBQ3pFLENBQUEifQ==