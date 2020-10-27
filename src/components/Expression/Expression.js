import React from 'react'
import styles from './Expression.module.css'
import { Formik, Form } from "formik";
import { InputAdornment } from "@material-ui/core";
import { Range } from "../Range/Range";
import IconButton from '@material-ui/core/IconButton';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import { FormikTextField } from 'formik-material-fields';
import * as Yup from "yup";

export const Expression = (props) => {
    const {setParameters} = props;

    const checkExpression = (str) => {
        const operations = ['+', '-', '*', '/', '(', ')', '.', ' '];
        const set = new Set();

        for (let i = 0; i < str.length; i += 1) {
            if (!operations.includes(str[i]) && isNaN(str[i]) ) {
                set.add(str[i]);
            }
        }

        return (set.size <= 1);
    }

    const validationSchema = Yup.object().shape({
        rangeX: Yup.object().shape({
            from: Yup.number()
                .typeError("enter number")
                .required("field required"),
            to: Yup.number()
                .typeError("enter number")
                .required("field required"),
        }),
        expression: Yup.string()
            .test({
                name: 'correctExpression',
                message: "enter expression with one variable",
                test: (value) => value && checkExpression(value)
            })
    });

    return (
        <Formik
            initialValues={{expression: "", rangeX: {from: "", to: ""}}}
            validationSchema={validationSchema}
            onSubmit={values => {
                setParameters(values)
            }}
        >
            <Form>
                <FormikTextField
                    name="expression"
                    variant="outlined"
                    placeholder="Enter what you want to calculate"
                    classes={{root: styles.expression}}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="show result"
                                    type="submit"
                                >
                                    <DragHandleIcon color="primary"/>
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Range>
                    <FormikTextField
                        variant="outlined"
                        name="rangeX.from"
                        label="From"
                        classes={{root: styles.rangeFrom}}
                    />
                    <FormikTextField
                        variant="outlined"
                        name="rangeX.to"
                        label="To"
                        classes={{root: styles.rangeTo}}
                    />
                </Range>
            </Form>
        </Formik>
    )
}

